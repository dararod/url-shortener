import type { ObjectId } from "mongodb";
import type { IApplicationEntity } from "../../infra/IApplicationEntity";
import type { Id } from "../../infra/Id";

export interface ILinkEntity extends IApplicationEntity{
    fullUrl: string;
    slug: string;
    activated: boolean;
    userId: ObjectId;
  }

export class LinkEntity implements ILinkEntity {
    public readonly id: Id;
    public readonly fullUrl: string;
    public readonly slug: string;
    public readonly activated: boolean;
    public readonly userId: ObjectId;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;

    constructor(dto: ILinkEntity) {
        this.id = dto.id;
        this.fullUrl = dto.fullUrl;
        this.slug = dto.slug;
        this.activated = dto.activated;
        this.userId = dto.userId;
        this.createdAt = dto.createdAt;
        this.updatedAt = dto.updatedAt;
    }
}