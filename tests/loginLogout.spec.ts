import { test, expect, request } from "@playwright/test";
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

  
const expectedLoginLogoutResponseSchema = z.object({
        code: z.literal(200),
        type: z.literal("unknown"),
        message: z.string().optional(),
    });
  const username = createUserRequestBody.username;
  const expectedDeleteUserByUserNameResponseSchema = z.object({
    code: z.literal(200),
    type: z.literal("unknown"),
    message: z.literal(username),
  });
    
    test.beforeEach(async ({ request }) => {
        await postAPI(
            request,
            `${BASE_URL}/user`,
            createUserRequestBody,
            200,
            expectedCreateUserResponseSchema
        );
    });

    test("login user", async ({ request }) => {
          await getAPI(
          request,
          `${BASE_URL}/user/login`,
          200,
          expectedLoginLogoutResponseSchema,
          { username: createUserRequestBody.username, password: createUserRequestBody.password }
       );
    });

    test("logout user", async ({ request }) => {
           await getAPI(
        request,
        `${BASE_URL}/user/logout`,
        200,
               expectedLoginLogoutResponseSchema,
               { username: createUserRequestBody.username }
           );
    });

    test.afterEach(async ({ request }) => {
        await deleteAPI(
            request,
            `${BASE_URL}/user/${username}`,
            200,
            expectedDeleteUserByUserNameResponseSchema
        );
    });
}); 
