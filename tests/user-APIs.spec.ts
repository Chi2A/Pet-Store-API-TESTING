import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { z } from "zod";

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
       userStatus: faker.number.int({ min: 1, max: 10 })
     };
      test("Create a new user", async ({ request }) => {
       const userName = createUserRequestBody.username;
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
        const userName = createUserRequestBody.username;
        let getUserResponse;
        for(let i=0; i<5; i++){
          getUserResponse = await request.get(`${BASE_URL}/user/${userName}`);
            if (getUserResponse.status() === 200) break;
            console.log(`Attempt ${i + 1} failed. Retrying...`);
        }
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

         const actualGetUserByUserNameResponseBody =
           await getUserByUserNameResponse.json();
        expectedGetUserByUserNameResponseSchema.parse(actualGetUserByUserNameResponseBody);


    });

    test("Delete user by username", async ({ request }) => {
        const userName = createUserRequestBody.username;
        const deleteUserByUserNameResponse = await request.delete(`${BASE_URL}/user/${userName}`);
        expect(deleteUserByUserNameResponse.status()).toBe(200);
        const expectedDeleteUserByUserNameResponseSchema = z.object({
          code: z.literal(200),
          type: z.literal("unknown"),
          message: z.literal(createUserRequestBody.username),
        });
        const deleteUserByUserNameResponseBody =
          await deleteUserByUserNameResponse.json();
        expectedDeleteUserByUserNameResponseSchema.parse(deleteUserByUserNameResponseBody);
    
    
    }); 
});
