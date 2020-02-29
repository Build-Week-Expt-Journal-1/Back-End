const server = require("../../server.js");
const request = require("supertest");
const db = require("../../../database/dbConfig");

describe("places route", () => {
  beforeEach(async () => {
    await db("places").truncate();
    await db("users").truncate();
  });

  test("returns an object on get", async () => {
    const reg = await request(server)
      .post("/api/users/register")
      .send({
        username: "test",
        password: "testing"
      });
    const login = await request(server)
      .post("/api/users/login")
      .send({
        username: "test",
        password: "testing"
      })
      .then(async rest => {
        const token = rest.text.split(`"`)[rest.text.split(`"`).length - 2];
        const res = await request(server)
          .get("/api/restaurants/")
          .set({ user_id: 1, authorization: token });

        expect(res.body).toStrictEqual({});
      });
  });

  test("it will let you post", async () => {
    const reg = await request(server)
      .post("/api/users/register")
      .send({
        username: "Frankie",
        password: "pass1"
      });
    const login = await request(server)
      .post("/api/users/login")
      .send({
        username: "Frankie",
        password: "pass1"
      })
      .then(async rest => {
        const token = rest.text.split(`"`)[rest.text.split(`"`).length - 2];
        const post = await request(server)
          .post("/api/places")
          .set({ user_id: 1, authorization: token })
          .send({
            city: "Kathmandu",
            country: "Nepal",
            user_id: 1
          });

        expect(post.status).toBe(201);
      });
  });
});


test("can delete", async ()=> {
   var   token;

   const reg = await request(server)
   .post("api/users/register")
   .send({
       username: "test",
       password :"testing"
   });

   const login = await request(server)
   .post('/api/users/login')
   .send({
    username: "test",
    password :"testing"
})
.then(async rest => {
    token = rest.text.split(`"`)[rest.text.split(`"`).length - 2];
    const post = await request(server)
      .post("/api/places/")
      .set({user_id:1, authorization:token})
      .send({
          city: "UlaanBator",
          country: "Mongolia",
          user_id:1
      })
      .then(async ()=> {
          const del = await request(server)
          .delete("/api/places/1")
          .set({user_id:1, authorization:token});

          expect(del.status).toBe(204);
      })
})
})