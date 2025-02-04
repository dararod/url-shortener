import { LinkEntity } from "./LinkEntity";
import { LinkNotFoundError } from "./errors/LinkNotFoundError";

import type { Id } from "../../infra/Id";
import type { ILinkEntity } from "./LinkEntity";
import type { LinkRepository } from "./LinkRepository";

export type CreateLinkDto = Omit<
  ILinkEntity,
  "id" | "activated" | "createdAt" | "updatedAt"
>;

export type UpdateLinkDto = Omit<
  ILinkEntity,
  "id" | "activated" | "createdAt" | "updatedAt"
>;

export class LinkService {
  private linkRepository: LinkRepository;

  constructor(linkRepository: LinkRepository) {
    this.linkRepository = linkRepository;
  }

  get databaseCollection(): string {
    return this.linkRepository.collectionName;
  }

  async create(dto: CreateLinkDto): Promise<LinkEntity | null> {
    const linkId = await this.linkRepository.create({
      fullUrl: dto.fullUrl,
      slug: dto.slug,
      activated: true,
      userId: dto.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.linkRepository.findById(linkId);
  }

  async getBySlug(slug: string): Promise<LinkEntity | null> {
    return this.linkRepository.findOne({ slug });
  }

  async updateLinkDetails(id: Id, dto: Partial<ILinkEntity>): Promise<LinkEntity> {
    const { fullUrl, slug, activated } = dto;

    await this.linkRepository.update(id, {
      fullUrl,
      slug,
      activated
    });

    return await this.linkRepository.findById(id) as LinkEntity;
  }
}
