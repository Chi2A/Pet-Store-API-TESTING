import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { z } from "zod";

test.describe("User API Tests", () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
      test("Create a new user", async ({ request }) => {
        const createUserRequestBody = {
          id: "12312",
          username: "TestAlina2626@",
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          password: "Test2626@",
          phone: faker.phone.number(),
          userStatus: 0,
        };
        const createUserResponse = await request.post(`${BASE_URL}/user`, {
          data: createUserRequestBody,
        });
        
          expect(createUserResponse.status()).toBe(200);
          const expectedCreateUserResponseSchema = z.object({
            code: z.literal(200),
            type: z.literal("unknown"),
            message: z.literal(createUserRequestBody.id),
          });
        const createUserResponseBody = await createUserResponse.json();
        expectedCreateUserResponseSchema.parse(createUserResponseBody);
      });
    
    test("Get user by username", async ({ request }) => {
        const userName = "TestAlina2626@";
        const getUserByUserNameResponse = await request.get(`${BASE_URL}/user/${userName}`);
        expect(getUserByUserNameResponse.status()).toBe(200);
       

        const expectedGetUserByUserNameResponseSchema = z.object({
          id: z.number(),
          username: z.string(),
          firstName: z.string().optional(),
          lastName: z.string().optional(),
          email: z.string().email().optional(),
          password: z.string().optional(),
          phone: z.string().optional(),
          userStatus: z.number().optional(),
        });

         const getUserByUserNameResponseBody =
           await getUserByUserNameResponse.json();
        expectedGetUserByUserNameResponseSchema.parse(getUserByUserNameResponseBody);


    });
    
    
});
