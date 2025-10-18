import { test, expect, request } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { z } from "zod";
import { getAPI, postAPI, putAPI, deleteAPI } from "../utils/apiCallHelper";

test.describe("User API Tests", () => {
  const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
  let createRandomUsers: any[];

  test.beforeEach(() => {
    createRandomUsers = [];
    for (let i = 0; i < 4; i++) {
      createRandomUsers.push({
        id: faker.number.int({ min: 1, max: 1000 }),
        username: "TestAlina2626@-delete-after",
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number(),
        userStatus: faker.number.int({ min: 1, max: 10 }),
      });
    }
  });

  const responseSchema = z.object({
    code: z.literal(200),
    type: z.literal("unknown"),
    message: z.literal("ok"),
  });

  test("Create list of users with array", async ({ request }) => {
    await postAPI(
      request,
      `${BASE_URL}/user/createWithArray`,
      createRandomUsers,
      200,
      responseSchema
    );
  });

  test("Create list of users with list", async ({ request }) => {
    await postAPI(
      request,
      `${BASE_URL}/user/createWithList`,
      createRandomUsers,
      200,
      responseSchema
    );
  });
});
