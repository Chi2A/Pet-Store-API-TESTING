import { test, expect, request } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { z } from "zod";
import { getAPI, postAPI, putAPI, deleteAPI } from "../utils/apiCallHelper";

test.describe("Store API Tests", () => {
  const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
  const orderId = 1380;
  const placeOrderRequestBody = {
    id: faker.number.int({ min: 1, max: 100000 }),
    petId: faker.number.int({ min: 0, max: 1000 }),
    quantity: faker.number.int({ min: 1, max: 10 }),
    shipDate: faker.date.future().toISOString(),
    status: faker.helpers.arrayElement([ "delivered"]),
    complete: faker.datatype.boolean(),
  };

  const expectedPlaceOrderResponseSchema = z.object({
    id: z.number().optional(),
    petId: z.number().optional(),
    quantity: z.number().optional(),
    shipDate: z.string().optional(),
    status: z.enum([ "delivered"]).optional(),
    complete: z.boolean().optional(),
  });

  const expectedGetOrderByIdResponseSchema = z.object({
    id: z.number().optional(),
    petId: z.number().optional(),
    quantity: z.number().optional(),
    shipDate: z.string().optional(),
    status: z.enum([ "delivered"]).optional(),
    complete: z.boolean().optional(),
  });

  const expectedDeleteOrderByIdResponseSchema = z.object({
    code: z.literal(200),
    type: z.literal("unknown"),
    message: z.literal(orderId.toString()),
  });

  test("End-to-End: Place, Get, Delete order", async ({ request }) => {
    await postAPI(
      request,
      `${BASE_URL}/store/order`,
      placeOrderRequestBody,
      200,
      expectedPlaceOrderResponseSchema
    );

    await getAPI(
      request,
      `${BASE_URL}/store/order/${orderId}`,
      200,
      expectedGetOrderByIdResponseSchema
    );
    await deleteAPI(
      request,
      `${BASE_URL}/store/order/${orderId}`,
      200,
      expectedDeleteOrderByIdResponseSchema
    );
  });
});
