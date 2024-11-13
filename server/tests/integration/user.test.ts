import { afterEach, describe, expect, it } from 'vitest';

import { Services } from '../../src/app/services';
import { makeDatabaseConn } from '../../src/infra/repository';
import { DATABASE_URL } from '../constants';

import type { IUserEntity } from '../../src/domain/user/UserEntity';

describe('user service', () => {
  afterEach(async () => {
    const database = await makeDatabaseConn(DATABASE_URL);
    const services = new Services(database);
    await database.connection.dropCollection(services.userService.databaseCollection);
  });

  it('creates a user', async () => {
    const database = await makeDatabaseConn(DATABASE_URL);
    const services = new Services(database);
    const user = await services.userService.register({
      name: 'John',
      surname: 'Doe',
      email: 'j.doe@mail.com',
      password: '123456',
    });

    expect(user).toBeDefined();
    expect(user?.name).toBe('John');
    expect(user?.surname).toBe('Doe');
    expect(user?.email).toBe('j.doe@mail.com');
    expect(user?.accessToken).toBeDefined();
    expect(user?.passwordHash).toBeDefined();
    expect(user?.createdAt).toBeDefined();
    expect(user?.updatedAt).toBeDefined();
  });

  it('gets user by id', async () => {
    const database = await makeDatabaseConn(DATABASE_URL);
    const services = new Services(database);
    const { id } = (await services.userService.register({
      name: 'John',
      surname: 'Doe',
      email: 'j.doe@mail.com',
      password: '123456',
    }) as IUserEntity);
    const user = await services.userService.getById(id);

    expect(user).toBeDefined();
    expect(user?.id).toBe(id);
    expect(user?.name).toBe('John');
    expect(user?.surname).toBe('Doe');
    expect(user?.email).toBe('j.doe@mail.com');
    expect(user?.accessToken).toBeDefined();
    expect(user?.passwordHash).toBeDefined();
    expect(user?.createdAt).toBeDefined();
    expect(user?.updatedAt).toBeDefined();
  });

  it('verifies a user password', async () => {
    const database = await makeDatabaseConn(DATABASE_URL);
    const services = new Services(database);
    const user = (await services.userService.register({
      name: 'John',
      surname: 'Doe',
      email: 'j.doe@mail.com',
      password: '123456',
    }) as IUserEntity);

    const isValid = await services.userService.verifyPassword(user, '123456');
    expect(isValid).toBe(true);

    const isInvalid = await services.userService.verifyPassword(user, '1234567');
    expect(isInvalid).toBe(false);
  });

  it('generates and verifies access token', async () => {
    const database = await makeDatabaseConn(DATABASE_URL);
    const services = new Services(database);
    const user = (await services.userService.register({
      name: 'John',
      surname: 'Doe',
      email: 'j.doe@mail.com',
      password: '123456',
    }) as IUserEntity);
    const accessToken = await services.userService.generateAccessToken(user);

    const isValid = services.userService.verifyAccessToken(user, accessToken);
    expect(isValid).toBe(true);

    const isInvalid = services.userService.verifyAccessToken(user, '1234567');
    expect(isInvalid).toBe(false);
  });

  it('updates a user details', async () => {
    const database = await makeDatabaseConn(DATABASE_URL);
    const services = new Services(database);
    const { id } = (await services.userService.register({
      name: 'John',
      surname: 'Doe',
      email: 'j.doe@mail.com',
      password: '123456',
    }) as IUserEntity);
    const user = (await services.userService.updateUserDetails(id, {
      name: 'Alice',
      surname: 'Doe',
    }) as IUserEntity);

    expect(user).toBeDefined();
    expect(user?.id).toBe(id);
    expect(user?.name).toBe('Alice');
    expect(user?.surname).toBe('Doe');
    expect(user?.email).toBe('j.doe@mail.com');
  });
});
