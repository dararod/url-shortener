import { UserRepository } from '../domain/user/UserRepository';
import { UserService } from '../domain/user/UserService';

import type { Database } from '../infra/repository';

export class Services {
  public readonly userService: UserService;

  constructor(database: Database) {
    const userRepository = new UserRepository(database);

    this.userService = new UserService(userRepository);
  }
}
