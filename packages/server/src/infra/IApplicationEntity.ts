import type { Id } from "./Id";

export interface IApplicationEntity {
    id: Id;
    createdAt: Date;
    updatedAt: Date;
}