import { test, expect ,request} from "@playwright/test";
import { z } from "zod";
import { getAPI, postAPI } from "../utils/apiCallHelper";  
const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
const expectedInventoryResponseSchema = z
  .record(
    z.string().regex(/^[a-zA-Z0-9_-]+$/, "Invalid inventory key format"),
    z.number().int().nonnegative()
  )
  // Optional check for non-empty response
  .refine((obj) => Object.keys(obj).length > 0, {
    message: "Response must contain at least 1 key",
  });

test("should return pet inventories with 14 items", async ({ request }) => {

const response = await getAPI(
      request,
      `${BASE_URL}/store/inventory`,
      200,
      expectedInventoryResponseSchema
    );
});
