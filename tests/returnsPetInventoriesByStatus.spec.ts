import { test, expect ,request} from "@playwright/test";
import { z } from "zod";
import { getAPI, postAPI } from "../utils/apiCallHelper";  
const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
const expectedInventoryResponseSchema  = z.record(z.number());

test("should return pet inventories with 14 items", async ({ request }) => {

const response = await getAPI(
      request,
      `${BASE_URL}/store/inventory`,
      200,
      expectedInventoryResponseSchema
    );
});
