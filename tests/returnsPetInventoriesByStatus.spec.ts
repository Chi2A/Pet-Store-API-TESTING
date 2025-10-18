import { test, expect ,request} from "@playwright/test";
import { z } from "zod";
import { getAPI, postAPI } from "../utils/apiCallHelper";  

const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}/store/inventory`
  const expectedInventoryResponseSchema = z
    .record(z.string(), z.number())
    .refine((data: Record<string, number>) => Object.keys(data).length === 14, {
      message: "Response must have exactly 14 keys",
    });

test("should return pet inventories with 14 items", async ({ request }) => {

const response = await getAPI(
      request,
      BASE_URL,
      200,
      expectedInventoryResponseSchema
    );
});
