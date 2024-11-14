import { LinkEntity } from "./LinkEntity";

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
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.linkRepository.findById(linkId);
  }

  async getById(id: Id): Promise<LinkEntity | null> {
    return this.linkRepository.findById(id);
  }

  async updateLinkDetails(id: Id, dto: Partial<ILinkEntity>): Promise<LinkEntity> {
    const { fullUrl, slug } = dto;

    await this.linkRepository.update(id, {
      fullUrl,
      slug,
    });

    return await this.getById(id) as LinkEntity;
  }

  async deactivate(id: Id): Promise<LinkEntity | null> {
    const link = await this.getById(id);

    if (link) {
      await this.linkRepository.update(id, {
        activated: false
      })

      return await this.getById(id) as LinkEntity;
    }
    
    throw new Error('The link was not found with that id')
  }

  async activate(id: Id): Promise<LinkEntity | null> {
    const link = await this.getById(id);

    if (link) {
      await this.linkRepository.update(id, {
        activated: true
      })

      return await this.getById(id) as LinkEntity;
    }
    
    throw new Error('The link was not found with that id')
  }
}
