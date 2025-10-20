import { test, expect, request } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { z } from "zod";
import { getAPI, postAPI, putAPI, deleteAPI } from "../utils/apiCallHelper";


test.describe("Find Pets", () => {
    const BASE_URL = `${process.env.BASE_URL}${process.env.API_VERSION}`;
    const expectedFindPetsByStatusResponseSchema = z.array(
        z.object({
            id: z.number().optional(),
            category: z.object({
                id: z.number().optional(),
                name: z.string().optional(),
            }).optional(),
            name: z.string().optional(),
            photoUrls: z.array(z.string()).optional(),
            tags: z.array(
                z.object({
                    id: z.number().optional(),
                    name: z.string().optional(),
                })
            ).optional(),
            status: z
                .string()
                .transform((val) => val.toLowerCase())
                .pipe(z.enum(["available", "pending", "sold"]))
                .optional(),
        })

);

    test("Find Pets by Status - available", async ({ request }) => {
        await getAPI(
            request,
            `${BASE_URL}/pet/findByStatus`,
            200,
            expectedFindPetsByStatusResponseSchema,
            { status: "available" }
        );
    }); 
    test("Find Pets by tags", async ({ request }) => {
        await getAPI(
            request,
            `${BASE_URL}/pet/findByTags`,
            200,
            expectedFindPetsByStatusResponseSchema,
            { tags: ["dog", "cute", "brown"] }
        );
    });     
});