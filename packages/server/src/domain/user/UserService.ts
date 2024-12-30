import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { UserEntity } from "./UserEntity";

import type { Id } from "../../infra/Id";
import type { IUserEntity } from "./UserEntity";
import type { UserRepository } from "./UserRepository";

export type RegisterUserDto = Omit<
  IUserEntity,
  "id" | "passwordHash" | "accessToken" | "createdAt" | "updatedAt"
> & {
  password: string;
};

export type UpdateUserDto = Omit<
  IUserEntity,
  "id" | "passwordHash" | "accessToken" | "createdAt" | "updatedAt"
> & {
  password: string;
};

const SALT_ROUNDS = 10;

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  get databaseCollection(): string {
    return this.userRepository.collectionName;
  }

  async register(dto: RegisterUserDto): Promise<UserEntity | null> {
    const passwordHash = await this.hashPassword(dto.password);
    const userId = await this.userRepository.create({
      name: dto.name,
      email: dto.email,
      surname: dto.surname,
      accessToken: '',
      passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.userRepository.findById(userId);
  }

  async getById(id: Id): Promise<UserEntity | null> {
    return this.userRepository.findById(id);
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      email,
    });
  }

  async updateUserDetails(id: Id, dto: Partial<IUserEntity>): Promise<UserEntity> {
    const { name, surname } = dto;

    await this.userRepository.update(id, {
      name,
      surname,
    });

    return await this.getById(id) as UserEntity;
  }

  async hashPassword(raw: string): Promise<string> {
    return await bcrypt.hash(raw, SALT_ROUNDS);
  }

  async verifyPassword(userEntity: IUserEntity, raw: string): Promise<boolean> {
    return bcrypt.compare(raw, userEntity.passwordHash);
  }

  async generateAccessToken(userEntity: IUserEntity): Promise<string> {
    const accessToken = uuidv4();

    userEntity.accessToken = accessToken;
    await this.userRepository.update(userEntity.id, userEntity);

    return accessToken;
  }

  async getByAccessToken(accessToken: string): Promise<UserEntity | null> {
    if (!accessToken) {
      return null;
    }

    return await this.userRepository.findOne({ accessToken });
  }
}
