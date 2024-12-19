import { Repository } from "../../infra/repository";

import type { Database } from "../../infra/repository";
import type { LinkEntity } from "./LinkEntity";

export class LinkRepository extends Repository<LinkEntity> {
    constructor(dbConn: Database) {
      super(dbConn, 'links');
    }
}
