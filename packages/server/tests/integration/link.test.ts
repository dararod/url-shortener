import { afterEach, describe, expect, it } from "vitest";

import { Services } from "../../src/app/services";
import { makeDatabaseConn } from "../../src/infra/repository";
import { DATABASE_URL } from "../constants";

import type { ILinkEntity } from "../../src/domain/link/LinkEntity";

describe("link service", () => {
  afterEach(async () => {
    const database = await makeDatabaseConn(DATABASE_URL);
    const services = new Services(database);
    await database.connection.dropCollection(
      services.linkService.databaseCollection
    );
  });

  it("creates a link", async () => {
    const database = await makeDatabaseConn(DATABASE_URL);
    const services = new Services(database);
    const link = await services.linkService.create({
      fullUrl: "https://www.youtube.com/watch?v=wLfgEg-IM2Y",
      slug: "1",
    });

    expect(link).toBeDefined();
    expect(link?.fullUrl).toBe("https://www.youtube.com/watch?v=wLfgEg-IM2Y");
    expect(link?.slug).toBe("1");
    expect(link?.activated).toBe(true);
    expect(link?.createdAt).toBeDefined();
    expect(link?.updatedAt).toBeDefined();
  });

  it("gets link by id", async () => {
    const database = await makeDatabaseConn(DATABASE_URL);
    const services = new Services(database);
    const { id } = (await services.linkService.create({
      fullUrl: "https://www.youtube.com/watch?v=wLfgEg-IM2Y",
      slug: "1",
    })) as ILinkEntity;
    const link = await services.linkService.getById(id);

    expect(link).toBeDefined();
    expect(link?.fullUrl).toBe("https://www.youtube.com/watch?v=wLfgEg-IM2Y");
    expect(link?.slug).toBe("1");
    expect(link?.activated).toBe(true);
    expect(link?.createdAt).toBeDefined();
    expect(link?.updatedAt).toBeDefined();
  });

  it("updates a links details", async () => {
    const database = await makeDatabaseConn(DATABASE_URL);
    const services = new Services(database);
    const { id } = (await services.linkService.create({
      fullUrl: "https://www.youtube.com/watch?v=wLfgEg-IM2Y",
      slug: "1",
    })) as ILinkEntity;
    const link = (await services.linkService.updateLinkDetails(id, {
      fullUrl: "https://www.youtube.com/watch?v=6MAzUT1YhWE&t=389s",
      slug: "2",
    })) as ILinkEntity;

    expect(link).toBeDefined();
    expect(link?.fullUrl).toBe("https://www.youtube.com/watch?v=6MAzUT1YhWE&t=389s");
    expect(link?.slug).toBe("2");
    expect(link?.activated).toBe(true);
    expect(link?.createdAt).toBeDefined();
    expect(link?.updatedAt).toBeDefined();
  });

  it("deactivates a link", async () => {
    const database = await makeDatabaseConn(DATABASE_URL);
    const services = new Services(database);
    const { id } = (await services.linkService.create({
      fullUrl: "https://www.youtube.com/watch?v=wLfgEg-IM2Y",
      slug: "1",
    })) as ILinkEntity;
    const linkBefore = await services.linkService.getById(id);
    expect(linkBefore?.activated).toBe(true);

    const linkAfter = (await services.linkService.deactivate(id)) as ILinkEntity;

    expect(linkAfter).toBeDefined();
    expect(linkAfter?.fullUrl).toBe("https://www.youtube.com/watch?v=wLfgEg-IM2Y");
    expect(linkAfter?.slug).toBe("1");
    expect(linkAfter?.activated).toBe(false);
    expect(linkAfter?.createdAt).toBeDefined();
    expect(linkAfter?.updatedAt).toBeDefined();
  });

  it("activates a link", async () => {
    const database = await makeDatabaseConn(DATABASE_URL);
    const services = new Services(database);
    const { id } = (await services.linkService.create({
      fullUrl: "https://www.youtube.com/watch?v=wLfgEg-IM2Y",
      slug: "1",
    })) as ILinkEntity;

    const linkBefore = (await services.linkService.deactivate(id)) as ILinkEntity;
    expect(linkBefore?.activated).toBe(false);

    const linkAfter = (await services.linkService.activate(id)) as ILinkEntity;
    expect(linkAfter).toBeDefined();
    expect(linkAfter?.fullUrl).toBe("https://www.youtube.com/watch?v=wLfgEg-IM2Y");
    expect(linkAfter?.slug).toBe("1");
    expect(linkAfter?.activated).toBe(true);
    expect(linkAfter?.createdAt).toBeDefined();
    expect(linkAfter?.updatedAt).toBeDefined();
  });
});
