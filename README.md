# Pet Store API Testing

API testing project using Playwright, TypeScript, Zod for schema validation, and Faker for test data generation.

## Project Structure

```
Pet-Store-API-TESTING/
├── tests/
│   └── example.spec.ts          # API test examples
├── schemas/
│   └── example.schema.ts        # Zod schemas for validation
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── package.json                 # Project dependencies
├── playwright.config.ts         # Playwright configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` file with your API configuration.

3. **Install Playwright browsers (optional for API testing):**
   ```bash
   npx playwright install
   ```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Show HTML report
npm run report
```

## Features

- ✅ **Playwright** for API testing
- ✅ **TypeScript** for type safety
- ✅ **Zod** for runtime schema validation
- ✅ **Faker** for dynamic test data generation
- ✅ **dotenv** for environment configuration
- ✅ Multiple reporters (HTML, list, JSON)
- ✅ Comprehensive test examples (GET, POST, PUT, PATCH, DELETE)

## Test Examples

The `tests/example.spec.ts` file includes examples of:

- GET requests with schema validation
- POST requests with Faker-generated data
- PUT/PATCH requests for updates
- DELETE requests
- Error handling (404 responses)
- Array and object schema validation

## Schema Validation

Schemas are defined using Zod in the `schemas/` directory. Example:

```typescript
export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  username: z.string(),
});
```

## Test Data Generation

Uses Faker for generating realistic test data:

```typescript
const newUser = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
};
```

## Contributing

Feel free to add more test cases, schemas, and improve the project structure.

## License

ISC
