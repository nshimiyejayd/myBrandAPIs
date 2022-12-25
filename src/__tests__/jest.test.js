import app from "../../index.js"
import request from "supertest";
import * as fs from 'fs';
import mongoose from "mongoose"

let blog_id = "";
let token = "";
let randEmail = "";
// describe('Initial test', () => {
//   test('should be equal to 2', () => {
//     expect(1 + 1).toBe(2);
//   });
// });

describe("POST /signup", () => {
  beforeEach(() => {
    randEmail = Math.random().toString(16).substring(2, 8); 
});
  test("User signup with valid email and password", async() => {
    const response = await request(app)
    .post("/api/v1/signup")
    .send({
      email: `${randEmail}Ab@12.com`,
      password: "mHousand20@one"
    })
    expect(response.body).toHaveProperty('user');
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /signup", () => {
  test("User signup with valid email which is already exist", async () => {
    const response = await request(app)
    .post("/api/v1/signup")
    .send({
      email: `${randEmail}Ab@12.com`,
      password: "pHousand20@one"
    })
    expect(response.body).not.toHaveProperty('user');
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /login", () => {
  test("User login with valid email and password", async () => {
    const response = await request(app)
    .post("/api/v1/login")
    .send({
      email: `${randEmail}Ab@12.com`,
      password: "mHousand20@one"
    })
    token = response.body.token
    expect(response.body).toHaveProperty('user_id');
    expect(response.body).toHaveProperty('token');
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /login", () => {
  test("User login with invalid email or password", async () => {
    const response = await request(app)
    .post("/api/v1/login")
    .send({
      email: "keys@gmail.com",
      password: "kHousand3%%kigali"
    })
    expect(response.body).not.toHaveProperty('user_id');
    expect(response.body).not.toHaveProperty('token');
    expect(response.statusCode).toBe(401);
  });
});

describe("POST /:id/comments", () => {
  test("Given invalid blog ID", async () => {
    const response = await request(app)
    .post("/api/v1/blogs/63a614e4d50dde2d6e340b5e/comments")
    .send({
      user: "Paccy",
      email: "paccy@gmail.com",
      comment: "Welcome!"
    })
    expect(response.statusCode).toBe(404);
  });
});

describe("POST /blogs", () => {
  test("Given all valid required data to add article and authenticated", async () => {
    const titleContent = {title: "Coding with Kk", content: "Start to code"};
    const response = await request(app)
    .post('/api/v1/blogs')
    .set('content-type', 'multipart/form-data')
    .set('Authorization', `bearer ${token}`)
    .field(titleContent)
    .attach('image', fs.readFileSync(`${__dirname}/imagetest.jpg`), '__tests__/imagetest.jpg')
   
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body['data']).toHaveProperty('_id');
  });
});

describe("POST /blogs", () => {
  test("Given all valid required data to add aticle but not authenticated", async () => {
    const invilid_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJ1c2VyIjp7Il9pZCI6IjYzYTJjMjI2ZTA5NDc3NzU0MTI3ZTQwOSIsImVtYWlsIjoia2luZ0BnbWFpbC5jb20ifSwiaWF0IjoxNjcxNzMwNzU5LCJleHAiOjE2NzE3MzI1NTl9.RtLBXXiK1XsL7Vtrgx7oB4dv2VS4H4yPi8O_jf4JMwA';
    const titleContent = {title: "Coding", content: "Start to code"};
    const response = await request(app)
    .post(`/api/v1/blogs`)
    .set('content-type', 'multipart/form-data')
    .set('Authorization', `bearer ${invilid_token}`)
    .field(titleContent)
    .attach('image', fs.readFileSync(`${__dirname}/imagetest.jpg`), '__tests__/imagetest.jpg')
    expect(response.statusCode).toBe(401);
  });
});

describe("POST /:id/comments", () => {
  beforeEach(async() => {
    const response = await request(app)
    .get('/api/v1/blogs');
    blog_id = response.body[0]._id;
});
  test("Given valid blog ID", async () => {
    const response = await request(app)
    .post(`/api/v1/blogs/${blog_id}/comments`)
    .send({
      user: "Paccy",
      email: "paccy@gmail.com",
      comment: "Welcome!"
    })
    expect(response.body).toHaveProperty('article_id');
    expect(response.statusCode).toBe(200);
  });
});


describe("DELETE /blogs/:id", () => {
    test("Given invalid blog ID", async () => {
      const response = await request(app)
      .delete(`/api/v1/blogs/63ac8b2862533546ac9d0661`)
      .set('Authorization', `bearer ${token}`)
      expect(response.statusCode).toBe(404);
    });
  });

describe("DELETE /blogs/:id", () => {
    test("Given token is not authenticated", async () => {
      const invilid_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJ1c2VyIjp7Il9pZCI6IjYzYTJjMjI2ZTA5NDc3NzU0MTI3ZTQwOSIsImVtYWlsIjoia2luZ0BnbWFpbC5jb20ifSwiaWF0IjoxNjcxNzMyMTMxLCJleHAiOjE2NzE3MzM5MzF9.i8fNopeTNUOP-OAd1pL-a3jhDm7M616oWpeGnefR0Dg';
      const response = await request(app)
      .delete(`/api/v1/blogs/${blog_id}`)
      .set('Authorization', `bearer ${invilid_token}`)
      expect(response.statusCode).toBe(401);
    });
  });

describe("PATCH /blogs/:id", () => {
  test("Given all valid required data to update article and valid blog ID with valid token", async () => {
    const titleContent = {title: "Coding (edited)", content: "Start to code"};
    const response = await request(app)
    .patch(`/api/v1/blogs/${blog_id}`)
    .set('content-type', 'multipart/form-data')
    .set('Authorization', `bearer ${token}`)
    .field(titleContent)
    .attach('image', fs.readFileSync(`${__dirname}/imagetest.jpg`), '__tests__/imagetest.jpg')
   
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

describe("PATCH /blogs/:id", () => {
  test("Given all valid required data to update article but invalid blog ID", async () => {
    const titleContent = {title: "Coding (edited)", content: "Start to code"};
    const response = await request(app)
    .patch(`/api/v1/blogs/63a7f1b60a0a490652e497b3`)
    .set('content-type', 'multipart/form-data')
    .set('Authorization', `bearer ${token}`)
    .field(titleContent)
    .attach('image', fs.readFileSync(`${__dirname}/imagetest.jpg`), '__tests__/imagetest.jpg')
   
    expect(response.statusCode).toBe(404);
    expect(response.body).not.toHaveProperty('data');
  });
});


describe("PATCH /blogs/:id", () => {
    test("Given token is not authenticated", async () => {
      const invilid_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzYTJjMjI2ZTA5NDc3NzU0MTI3ZTQwOSIsImVtYWlsIjoia2luZ0BnbWFpbC5jb20ifSwiaWF0IjoxNjcxNzM0MDQwLCJleHAiOjE2NzE3MzU4NDB9.HStywvJUNOLH3_QKZ389BdDpUOCzlKygyuH5ORG6M94';
      const titleContent = {title: "Coding (edited)", content: "Start to code"};
      const response = await request(app)
      .patch(`/api/v1/blogs/${blog_id}`)
      .set('Authorization', `bearer ${invilid_token}`)
      .set('content-type', 'multipart/form-data')
      .field(titleContent)
      .attach('image', fs.readFileSync(`${__dirname}/imagetest.jpg`), '__tests__/imagetest.jpg')
     
      expect(response.statusCode).toBe(401);
    });
  });

  describe("GET /messages", () => {
    test("Given token is authenticated", async () => {
      const response = await request(app)
      .get(`/api/v1/messages`)
      .set('Authorization', `bearer ${token}`)
      expect(response.statusCode).toBe(200);
    });
  });

  describe("POST /message", () => {
    test("Send message", async () => {
      const response = await request(app)
      .post(`/api/v1/messages`)
      .send({
        userName: "John",
        email: "john@example.com",
        message: "Hello!"
      })
      expect(response.statusCode).toBe(200);
    });
  });

  describe("POST /likes", () => {
    test("Add like", async () => {
      const response = await request(app)
      .post(`/api/v1/blogs/${blog_id}/likes`)
      expect(response.statusCode).toBe(200);
    });
  });

  describe("GET /blogs", () => {
    test("Given valid blog ID to get single blog", async () => {
      const response = await request(app)
      .get(`/api/v1/blogs/${blog_id}`)
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('data');
    });
  });

  describe("GET /blogs", () => {
    test("Given invilid blog ID to get single blog", async () => {
      const response = await request(app)
      .get(`/api/v1/blogs/63a614e4d50dde2d6e340b5e`)
      expect(response.statusCode).toBe(404);
    });
  });

  describe("GET /blogs", () => {
    test("Get all blogs", async () => {
      const response = await request(app)
      .get(`/api/v1/blogs`);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("DELETE /blogs/:id", () => {
    test("Given valid blog ID", async () => {
      const response = await request(app)
      .delete(`/api/v1/blogs/${blog_id}`)
      .set('Authorization', `bearer ${token}`)
      expect(response.statusCode).toBe(200);
    });
  });

  afterAll(async () => {
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.log(`
        ${error}
      `);
      throw error;
    }
});