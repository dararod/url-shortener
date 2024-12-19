import { UserRepository } from '../domain/user/UserRepository';
import { LinkRepository } from '../domain/link/LinkRepository';
import { UserService } from '../domain/user/UserService';
import { LinkService } from '../domain/link/LinkService';

import type { Database } from '../infra/repository';

export class Services {
  public readonly userService: UserService;
  public readonly linkService: LinkService;

  constructor(database: Database) {
    const userRepository = new UserRepository(database);
    const linkRepository = new LinkRepository(database)

    this.userService = new UserService(userRepository);
    this.linkService = new LinkService(linkRepository)
  }
}
