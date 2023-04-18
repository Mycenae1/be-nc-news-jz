const supertest = require("supertest");
const db = require("../../db/connection");
const seed = require("../../db/seeds/seed");
const app = require("../app");
const data = require("../../db/data/test-data");

beforeAll(() => {
  return seed(data);
});

afterAll(() => {
  db.end();
});

describe("GET api/topics", () => {
  test("should return a 200 status", () => {
    return supertest(app).get("/api/topics").expect(200);
  });
  test("should return an array of topic objects with correct properties", () => {
    return supertest(app)
      .get("/api/topics")
      .expect(200)
      .then(({body}) => {
        expect(body.length).toEqual(3);

        body.forEach((topic) => {
          expect(topic).toHaveProperty("slug");
          expect(topic).toHaveProperty("description");
        });
      });
  });

  test("should return 404 error when url is not found", () => {
    return supertest(app)
      .get("/api/banana")
      .expect(400)
      .then(({body}) => {
        expect(body.message).toBe("Invalid Request");
      });
  });
});

describe("GET api/articles/", () => {
  test("should return a 200 status", () => {
    return supertest(app).get("/api/articles").expect(200);
  });
  test("should return an array of topic objects with correct properties", () => {
    return supertest(app)
      .get("/api/articles")
      .expect(200)
      .then(({body}) => {
        expect(body.length).toEqual(5);
        body.forEach((article) => {
          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("topic");
          expect(article).toHaveProperty("created_at");
          expect(article).toHaveProperty("votes");
          expect(article).toHaveProperty("article_img_url");
          expect(article).toHaveProperty("comments_count");
        });
      });
  });

  test("should return 400 error when url is not found", () => {
    return supertest(app)
      .get("/api/banana")
      .expect(400)
      .then(({body}) => {
        expect(body.message).toBe("Invalid Request");
      });
  });

  test("200: Accepts a topic query ", () => {
    return supertest(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then(({body}) => {
        expect(body).toHaveLength(4);

        body.forEach((article) => {
          expect(article.topic).toBe("mitch");
        });
      });
  });

  test("400: topic query is invalid", () => {
    return supertest(app)
      .get("/api/treasures?topic=banana")
      .expect(400)
      .then(({body}) => {
        expect(body).toEqual({message: "Invalid Request"});
      });
  });

  test("200: Accepts a sort_by ", () => {
    return supertest(app)
      .get("/api/articles?sort_by=created_at")
      .expect(200)
      .then(({body}) => {
        expect(body.length).toBe(5);
        const allSorted = [];
        body.forEach((item) => {
          allSorted.push(item.treasure_name);
        });
        const sortedArticlesCopy = [...allSorted];
        const sortedArticles = allSorted.sort();
        expect(sortedArticles).toEqual(sortedArticlesCopy);
      });
  });
  test("400: bad request when passed invalid column to sort by", () => {
    return supertest(app)
      .get("/api/treasures?sort_by=banana")
      .expect(400)
      .then(({body}) => {
        expect(body).toEqual({message: "Invalid Request"});
      });
  });
  test("200: Can switch order to descending ", () => {
    return supertest(app)
      .get("/api/articles?order=desc")
      .expect(200)
      .then(({body}) => {
        expect(body.length).toBeGreaterThan(0);
        const createdAt = [];
        body.forEach((item) => {
          createdAt.push(item.created_at);
        });
        const createdCopy = [...createdAt];
        const sortedArticles = createdAt.sort((a, b) => b - a);
        expect(sortedArticles).toEqual(createdCopy);
      });
  });

  test("400: bad request when passed invalid order to sort by", () => {
    return supertest(app)
      .get("/api/treasures?order=banana")
      .expect(400)
      .then(({body}) => {
        expect(body).toEqual({message: "Invalid Request"});
      });
  });
});

describe(" GET /api/articles/:article_id", () => {
  test("should return a 200 status", () => {
    return supertest(app).get("/api/articles/1").expect(200);
  });
  test("should return an object representing the correct article ", () => {
    return supertest(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({body}) => {
        const bodySize = Object.keys({body}).length;
        expect(bodySize).toEqual(1);
        const size = Object.keys(body.articles).length;
        expect(size).toEqual(9);

        expect(body.articles).toHaveProperty("author");
        expect(body.articles).toHaveProperty("title");
        expect(body.articles).toHaveProperty("article_id");
        expect(body.articles).toHaveProperty("body");
        expect(body.articles).toHaveProperty("topic");
        expect(body.articles).toHaveProperty("created_at");
        expect(body.articles).toHaveProperty("votes");
        expect(body.articles).toHaveProperty("article_img_url");
        expect(body.articles).toHaveProperty("comment_count");
      });
  });

  test("should return 400 error when url is not found", () => {
    return supertest(app)
      .get("/api/banana")
      .expect(400)
      .then(({body}) => {
        expect(body.message).toBe("Invalid Request");
      });
  });

  test("should return 404 error when article id is invalid", () => {
    return supertest(app)
      .get("/api/articles/999")
      .expect(404)
      .then(({body}) => {
        expect(body.message).toBe("URL not found");
      });
  });
});

describe("GET api/articles/:article_id/comments", () => {
  test("should return a 200 status", () => {
    return supertest(app).get("/api/articles/1/comments").expect(200);
  });
  test("an array of comments for the given `article_id`", () => {
    return supertest(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({body}) => {
        const commentObject = body[0];
        const objectLength = Object.keys(commentObject).length;
        expect(body.length).toEqual(11);
        expect(objectLength).toEqual(6);
        expect(commentObject).toHaveProperty("comment_id");
        expect(commentObject).toHaveProperty("votes");
        expect(commentObject).toHaveProperty("created_at");
        expect(commentObject).toHaveProperty("author");
        expect(commentObject).toHaveProperty("body");
        expect(commentObject).toHaveProperty("article_id");
      });
  });

  test("an empty array for when there are no comments on an article ", () => {
    return supertest(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({body}) => {
        expect(body).toEqual({message: "Comments not found"});
      });
  });

  test("should return 400 error when url is not found", () => {
    return supertest(app)
      .get("/api/banana")
      .expect(400)
      .then(({body}) => {
        expect(body.message).toBe("Invalid Request");
      });
  });

  test("should return 404 error when article id is invalid", () => {
    return supertest(app)
      .get("/api/articles/999")
      .expect(404)
      .then(({body}) => {
        expect(body.message).toBe("URL not found");
      });
  });
});

describe("POST api/articles/:article_id/comments", () => {
  test("should return a 200 status", () => {
    return supertest(app).get("/api/articles/1/comments").expect(200);
  });
  test("POST: 201 - responds with new comment `", () => {
    const newComment = {
      username: "icellusedkars",
      body: "Test comment",
    };

    return supertest(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then((response) => {
        const ObjectLength = Object.keys(response.body).length;
        expect(ObjectLength).toEqual(6);
        expect(response.body).toHaveProperty("article_id");
        expect(response.body).toHaveProperty("body");
        expect(response.body).toHaveProperty("author");
        expect(response.body.author).toBe("icellusedkars");
        expect(response.body.body).toBe("Test comment");
      });
  });

  test("should return 400 error when url is not found", () => {
    return supertest(app)
      .get("/api/banana")
      .expect(400)
      .then(({body}) => {
        expect(body.message).toBe("Invalid Request");
      });
  });

  test("should return 404 error when article id is invalid", () => {
    return supertest(app)
      .get("/api/articles/999")
      .expect(404)
      .then(({body}) => {
        expect(body.message).toBe("URL not found");
      });
  });
});

describe("PATCH api/articles/:article_id", () => {
  test("should return a 200 status", () => {
    return supertest(app).get("/api/articles/1/comments").expect(200);
  });
  test("PATCH: 202 - accepts an object and responds with an updates article `", () => {
    const voteIncrement = {
      inc_votes: 50,
    };

    return supertest(app)
      .patch("/api/articles/1")
      .send(voteIncrement)
      .expect(202)
      .then((response) => {
        const article = response.body.articles;
        const objectSize = Object.keys(article).length;
        expect(objectSize).toEqual(8);

        expect(article).toHaveProperty("author");
        expect(article).toHaveProperty("title");
        expect(article).toHaveProperty("article_id");
        expect(article).toHaveProperty("body");
        expect(article).toHaveProperty("topic");
        expect(article).toHaveProperty("created_at");
        expect(article).toHaveProperty("votes");
        expect(article).toHaveProperty("article_img_url");
        expect(article.votes).toEqual(200);
      });
  });

  test("should return 400 error when url is not found", () => {
    return supertest(app)
      .get("/api/banana")
      .expect(400)
      .then(({body}) => {
        expect(body.message).toBe("Invalid Request");
      });
  });

  test("should return 404 error when article id is invalid", () => {
    return supertest(app)
      .get("/api/articles/999")
      .expect(404)
      .then(({body}) => {
        expect(body.message).toBe("URL not found");
      });
  });
});

describe("GET api/users", () => {
  test("should return a 200 status", () => {
    return supertest(app).get("/api/users").expect(200);
  });
  test("should return an array of user objects with correct properties", () => {
    return supertest(app)
      .get("/api/users")
      .expect(200)
      .then(({body}) => {
        let userArray = {body}.body;
        let user = userArray[0];
        expect(userArray.length).toEqual(4);
        expect(Object.keys(user).length).toEqual(3);
        expect(user).toHaveProperty("username");
        expect(user).toHaveProperty("name");
        expect(user).toHaveProperty("avatar_url");
      });
  });

  test("should return 400 error when url is not found", () => {
    return supertest(app)
      .get("/api/banana")
      .expect(400)
      .then(({body}) => {
        expect(body.message).toBe("Invalid Request");
      });
  });
});

describe("GET api/comments", () => {
  test("should return a 200 status", () => {
    return supertest(app).get("/api/comments").expect(200);
  });
  test("should return an array of comment objects with correct properties", () => {
    return supertest(app)
      .get("/api/comments")
      .expect(200)
      .then(({body}) => {
        let commentArray = {body}.body;
        let comment = commentArray[0];
        console.log(commentArray);
        console.log(comment);
        expect(Object.keys(comment).length).toEqual(6);
        expect(comment).toHaveProperty("comment_id");
        expect(comment).toHaveProperty("body");
        expect(comment).toHaveProperty("author");
        expect(comment).toHaveProperty("votes");
      });
  });

  test("should return 400 error when url is not found", () => {
    return supertest(app)
      .get("/api/banana")
      .expect(400)
      .then(({body}) => {
        expect(body.message).toBe("Invalid Request");
      });
  });
});

describe.skip("DELETE /api/articles/:article_id/comments/:comment_id ", () => {
  test("should return a 200 status", () => {
    return supertest(app)
      .delete(`/api/articles/1/comments/1`)
      .expect(204)
      .then((response) => {
        expect(response.body).toBe({});
        console.log(response);
      });
  });
  test("should respond with 404 if the comment id is invalid", () => {
    return supertest(app)
      .delete(`/api/articles/1/comments/999999`)
      .expect(404)
      .then(({body}) => {
        expect(body.message).toBe("Comment not found");
      });
  });
});
