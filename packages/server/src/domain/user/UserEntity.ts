import type { IApplicationEntity } from "../../infra/IApplicationEntity";
import type { Id } from "../../infra/Id";

export interface IUserEntity extends IApplicationEntity {
    name: string;
    surname: string;
    email: string;
    passwordHash: string;
    accessToken: string;
}

export class UserEntity implements IUserEntity {
    public readonly id: Id;
    public readonly name: string;
    public readonly surname: string;
    public readonly email: string;
    public readonly passwordHash: string;
    public readonly accessToken: string;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;

    constructor(dto: IUserEntity) {
        this.id = dto.id;
        this.name = dto.name;
        this.surname = dto.surname;
        this.email = dto.email;
        this.passwordHash = dto.passwordHash;
        this.accessToken= dto.accessToken;
        this.createdAt = dto.createdAt;
        this.updatedAt = dto.updatedAt;
    }
}
