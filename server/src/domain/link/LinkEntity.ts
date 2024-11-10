import type { IApplicationEntity } from "../../infra/IApplicationEntity";
import type { Id } from "../../infra/Id";

export interface ILinkEntity extends IApplicationEntity{
    fullUrl: string;
    shortUrl: string;
    activatedAt: Date;
    deactivatedAt: Date;
  }

export class LinkEntity implements ILinkEntity {
    public readonly id: Id;
    public readonly fullUrl: string;
    public readonly shortUrl: string;
    public readonly activatedAt: Date;
    public readonly deactivatedAt: Date;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;

    constructor(dto: ILinkEntity) {
        this.id = dto.id;
        this.fullUrl = dto.fullUrl;
        this.shortUrl = dto.shortUrl;
        this.activatedAt = dto.activatedAt;
        this.deactivatedAt = dto.deactivatedAt;
        this.createdAt = dto.createdAt;
        this.updatedAt = dto.updatedAt;
    }
}