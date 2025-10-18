import { test, expect } from "@playwright/test";
import { z } from "zod";

test("should return pet inventories with 14 items", async ({ request }) => {
  const response = await request.get(
    `${process.env.BASE_URL}${process.env.API_VERSION}/store/inventory`
  );

  expect(response.status()).toBe(200);
  const data = await response.json();
  const numberOfKeys = Object.keys(data).length;
  expect(numberOfKeys).toBe(14);

  const expectedInventoryResponseSchema = z
    .record(z.string(), z.number())
    .refine((data: Record<string, number>) => Object.keys(data).length === 14, {
      message: "Response must have exactly 14 keys",
    });
});
