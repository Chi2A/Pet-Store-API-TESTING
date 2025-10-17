import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { z } from "zod";
import { getAPI, postAPI, putAPI, deleteAPI } from "../utils/apiCallHelper";

test.describe("User API Tests", () => {
  const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
  const createUserRequestBody = {
    id: faker.number.int({ min: 1, max: 1000 }),
    username: "TestAlina2626@-delete-after",
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.number(),
    userStatus: faker.number.int({ min: 1, max: 10 }),
  };

  const expectedCreateUserResponseSchema = z.object({
    code: z.literal(200),
    type: z.literal("unknown"),
    message: z.literal(createUserRequestBody.id.toString()),
  });

  const expectedGetUserByUserNameResponseSchema = z.object({
    id: z.number().optional(),
    username: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    phone: z.string().optional(),
    userStatus: z.number().optional(),
  });
    

const updatedPutUserRequestBody = {
    id: createUserRequestBody.id,
    username: createUserRequestBody.username,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.number(),
    userStatus: faker.number.int({ min: 1, max: 10 }),
  };

  const username = createUserRequestBody.username;
  const expectedDeleteUserByUserNameResponseSchema = z.object({
    code: z.literal(200),
    type: z.literal("unknown"),
    message: z.literal(username),
  });
    
    const expectedLogoutResponseSchema = z.object({
        code: z.literal(200),
        type: z.literal("unknown"),
        message: z.literal("ok"),
    });


  test("End-to-End: Create, Get, Put, Delete user", async ({ request }) => {
    await postAPI(
      request,
      `${BASE_URL}/user`,
      createUserRequestBody,
      200,
      expectedCreateUserResponseSchema
    );

    await getAPI(
      request,
      `${BASE_URL}/user/${username}`,
      200,
      expectedGetUserByUserNameResponseSchema,
    );
      await getAPI(
          request,
          `${BASE_URL}/user/login`,
          200,
          expectedGetUserByUserNameResponseSchema,
          { username: createUserRequestBody.username, password: createUserRequestBody.password }
       );

    await putAPI(
      request,
      `${BASE_URL}/user/${username}`,
      updatedPutUserRequestBody,
      200,
      expectedGetUserByUserNameResponseSchema
    );
      await getAPI(
        request,
        `${BASE_URL}/user/logout`,
        200,
        expectedLogoutResponseSchema
      );

    await deleteAPI(
      request,
      `${BASE_URL}/user/${username}`,
      200,
      expectedDeleteUserByUserNameResponseSchema
    );
  });
});
