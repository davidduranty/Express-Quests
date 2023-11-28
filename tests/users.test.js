const request = require("supertest");
const crypto = require("node:crypto");

const app = require("../src/app");

describe("GET /api/users", () => {
  it("should return all users", async () => {
    const response = await request(app).get("/api/users");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });
});

describe("GET /api/users/:id", () => {
  it("should return one user", async () => {
    const response = await request(app).get("/api/users/1");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });

  it("should return no user", async () => {
    const response = await request(app).get("/api/users/0");

    expect(response.status).toEqual(404);
  });
});
describe("POST /api/users", () => {
  it("should return created user", async () => {
    const newUser = {
      firstname: "Dimitriov",
      lastname: "Dimitries",
      email: `${crypto.randomUUID()}@wild.co`,
      city: "Mexique",
      language: "Chelou",
    };

    const response = await request(app).post("/api/users").send(newUser);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("id");
    expect(typeof response.body.id).toBe("number");

    const [result] = await database.query(
      "SELECT * FROM users WHERE id=?",
      response.body.id
    );

    const [movieInDatabase] = result;

    expect(movieInDatabase).toHaveProperty("id");

    expect(movieInDatabase).toHaveProperty("firstname");
    expect(typeof movieInDatabase.firstname).toBe("string");

    expect(movieInDatabase).toHaveProperty("lastname");
    expect(typeof movieInDatabase.lastname).toBe("string");

    expect(movieInDatabase.email).toHaveProperty("email");
    expect(typeof movieInDatabase.email).toBe("string");

    expect(movieInDatabase).toHaveProperty("city");
    expect(typeof movieInDatabase.city).toBe("string");

    expect(movieInDatabase).toHaveProperty("language");
    expect(typeof movieInDatabase.language).toBe("string");
  });

  it("should return an error", async () => {
    const movieWithMissingProps = { firstname: "Axel" };

    const response = await request(app)
      .post("/api/users")
      .send(movieWithMissingProps);

    expect(response.status).toEqual(500);
  });
});

const database = require("../database");

afterAll(() => database.end());
