import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { z } from "zod";
import { postAPI } from "../utils/apiCallHelper";       


test.describe("Add Pet to the Store API Tests", () => {
  const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
  const addPetRequestBody = {
    id: faker.number.int({ min: 1, max: 1000 }),
    category: {
      id: faker.number.int({ min: 1, max: 1000 }),
      name: faker.animal.dog(),
    },
    name: faker.animal.dog(),
    photoUrls: [faker.image.url()],
    tags: [
      {
        id: faker.number.int({ min: 1, max: 1000 }),
        name: faker.word.noun(),
      },
    ],
    status: faker.helpers.arrayElement(["available", "pending", "sold"]),
  };

  const expectedAddPetResponseSchema = z.object({
    id: z.number().optional(),
    category: z
      .object({
        id: z.number().optional(),
        name: z.string().optional(),
      })
      .optional(),
    name: z.string().optional(),
    photoUrls: z.array(z.string().url()).optional(),
    tags: z
      .array(
        z.object({
          id: z.number().optional(),
          name: z.string().optional(),
        })
      )
      .optional(),
    status: z.enum(["available", "pending", "sold"]).optional(),
  });

  test("Add Pet to the Store", async ({ request }) => {
    await postAPI(
      request,
      `${BASE_URL}/pet`,
      addPetRequestBody,
      200,
      expectedAddPetResponseSchema
    );
  });   
});
