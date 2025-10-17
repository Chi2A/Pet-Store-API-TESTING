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
    test("Create list of users with array", async ({ request }) => {
        const listOfUsersRequestBody = [
            createUserRequestBody,
            {
                id: faker.number.int({ min: 1, max: 1000 }),
                username: "TestAlina2626@-delete-after",
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                phone: faker.phone.number(),
                userStatus: faker.number.int({ min: 1, max: 10 }),
            },
        ];
        const expectedCreateListOfUsersResponseSchema = z.object({
            code: z.literal(200),
            type: z.literal("unknown"),
            message: z.literal("ok"),
        });
        await postAPI(
            request,
            `${BASE_URL}/user/createWithArray`,
            listOfUsersRequestBody,
            200,
            expectedCreateListOfUsersResponseSchema,
        );
    });
});