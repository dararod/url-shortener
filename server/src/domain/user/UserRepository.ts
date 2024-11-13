import { Repository } from "../../infra/repository";

import type { Database } from "../../infra/repository";
import type { UserEntity } from "./UserEntity";

export class UserRepository extends Repository<UserEntity> {
    constructor(dbConn: Database) {
      super(dbConn, 'users');
    }
}
