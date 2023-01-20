const supertest = require('supertest');
const db = require("../../db/connection");
const seed = require('../../db/seeds/seed');
const app = require('../app');
const data= require('../../db/data/test-data')

beforeAll(() =>{
    return seed(data)
});

afterAll(() =>{
    db.end();
});


describe('GET api/topics', () => {
    test('should return a 200 status', () => {
        return supertest(app).get('/api/topics').expect(200)
    
    })
    test('should return an array of topic objects with correct properties', () => {
        return supertest(app).get('/api/topics').expect(200)
        .then(({body}) => {
            expect(body.length).toEqual(3);

            body.forEach((topic) => {
                    expect(topic).toHaveProperty('slug');
                    expect(topic).toHaveProperty('description');
                  
                   
            })
        })
    })

    test('should return 404 error when url is not found', () => {
        return supertest(app)
        .get('/api/banana')
        .expect(400)
        .then(({body}) => {
            expect(body.message).toBe('Invalid Request');

        })
    })



})



describe('GET api/articles/', () => {
    test('should return a 200 status', () => {
        return supertest(app).get('/api/articles').expect(200)
    
    })
    test('should return an array of topic objects with correct properties', () => {
        return supertest(app).get('/api/articles').expect(200)
        .then(({body}) => {
            console.log(body)
            expect(body.length).toEqual(5); 
            body.forEach((article) => {
                    expect(article).toHaveProperty('author');
                    expect(article).toHaveProperty('title');
                    expect(article).toHaveProperty('article_id');
                    expect(article).toHaveProperty('topic');
                    expect(article).toHaveProperty('created_at');
                    expect(article).toHaveProperty('votes');
                    expect(article).toHaveProperty('article_img_url');
                    expect(article).toHaveProperty('comments_count');
                   
            })
        })
    })

    test('should return 400 error when url is not found', () => {
        return supertest(app)
        .get('/api/banana')
        .expect(400)
        .then(({body}) => {
            expect(body.message).toBe('Invalid Request');

        })
    })





})



describe(' GET /api/articles/:article_id', () => {
    test('should return a 200 status', () => {
        return supertest(app).get('/api/articles/1').expect(200)
    
    })
    test('should return an object representing the correct article ', () => {
        return supertest(app).get('/api/articles/1').expect(200)
        .then(({body}) => {
            const bodySize = Object.keys({body}).length
            expect(bodySize).toEqual(1); 
            const size = Object.keys(body.articles).length;
            expect(size).toEqual(8)

                    expect(body.articles).toHaveProperty('author');
                    expect(body.articles).toHaveProperty('title');
                    expect(body.articles).toHaveProperty('article_id');
                    expect(body.articles).toHaveProperty('body');
                    expect(body.articles).toHaveProperty('topic');
                    expect(body.articles).toHaveProperty('created_at');
                    expect(body.articles).toHaveProperty('votes');
                    expect(body.articles).toHaveProperty('article_img_url');
                   
            
        })
    })

    test('should return 400 error when url is not found', () => {
        return supertest(app)
        .get('/api/banana')
        .expect(400)
        .then(({body}) => {
            expect(body.message).toBe('Invalid Request');

        })
      })

      test('should return 404 error when article id is invalid', () => {
        return supertest(app)
        .get('/api/articles/999')
        .expect(404)
        .then(({body}) => {
            expect(body.message).toBe('URL not found');

        })

})
})






describe('GET api/articles/:article_id/comments', () => {
    test('should return a 200 status', () => {
        return supertest(app).get('/api/articles/1/comments').expect(200)
    
    })
    test('an array of comments for the given `article_id`', () => {
        return supertest(app).get('/api/articles/1/comments').expect(200)
        .then(({body}) => {
            const commentObject = body[0]
            const objectLength = Object.keys(commentObject).length
            expect(body.length).toEqual(11)
            expect(objectLength).toEqual(6)
                    expect(commentObject).toHaveProperty('comment_id');
                    expect(commentObject).toHaveProperty('votes');
                    expect(commentObject).toHaveProperty('created_at');
                    expect(commentObject).toHaveProperty('author');
                    expect(commentObject).toHaveProperty('body');
                    expect(commentObject).toHaveProperty('article_id');
                   
            
        })
    })

    test('an empty array for when there are no comments on an article ', () => {
        return supertest(app).get('/api/articles/2/comments').expect(200)
        .then(({body}) => {
            expect(body).toEqual({ message: 'Comments not found' })
                 
            
        })
    })



    test('should return 400 error when url is not found', () => {
        return supertest(app)
        .get('/api/banana')
        .expect(400)
        .then(({body}) => {
            expect(body.message).toBe('Invalid Request');

        })
      })

      test('should return 404 error when article id is invalid', () => {
        return supertest(app)
        .get('/api/articles/999')
        .expect(404)
        .then(({body}) => {
            expect(body.message).toBe('URL not found');

        })
    })

})





describe('POST api/articles/:article_id/comments', () => {
    test('should return a 200 status', () => {
        return supertest(app).get('/api/articles/1/comments').expect(200)
    
    })
    test('POST: 201 - responds with new comment `', () => {
        const newComment = {
            username: "icellusedkars",
            body: "Test comment"

        }

        return supertest(app).post('/api/articles/1/comments').send(newComment)
        .expect(201)
        .then((response) =>{
            const ObjectLength = Object.keys(response.body).length
            expect(ObjectLength).toEqual(6)
            expect(response.body).toHaveProperty('article_id')
            expect(response.body).toHaveProperty('body')
            expect(response.body).toHaveProperty('author')
            expect(response.body.author).toBe("icellusedkars",)
            expect(response.body.body).toBe("Test comment",)
         })
      })
   

    test('should return 400 error when url is not found', () => {
        return supertest(app)
        .get('/api/banana')
        .expect(400)
        .then(({body}) => {
            expect(body.message).toBe('Invalid Request');

        })
      })

      test('should return 404 error when article id is invalid', () => {
        return supertest(app)
        .get('/api/articles/999')
        .expect(404)
        .then(({body}) => {
            expect(body.message).toBe('URL not found');

        })
    })

})



describe('PATCH api/articles/:article_id', () => {
    test('should return a 200 status', () => {
        return supertest(app).get('/api/articles/1/comments').expect(200)
    
    })
    test('PATCH: 202 - accepts an object and responds with an updates article `', () => {
        const voteIncrement= {
            inc_votes: 50
        }

        return supertest(app).patch('/api/articles/1').send(voteIncrement)
        .expect(202)
        .then((response) =>{
            const article = response.body.articles
            const objectSize = Object.keys(article).length
            expect(objectSize).toEqual(8)

                    expect(article).toHaveProperty('author');
                    expect(article).toHaveProperty('title');
                    expect(article).toHaveProperty('article_id');
                    expect(article).toHaveProperty('body');
                    expect(article).toHaveProperty('topic');
                    expect(article).toHaveProperty('created_at');
                    expect(article).toHaveProperty('votes');
                    expect(article).toHaveProperty('article_img_url');
                    expect(article.votes).toEqual(200)
         })
      })
   

    test('should return 400 error when url is not found', () => {
        return supertest(app)
        .get('/api/banana')
        .expect(400)
        .then(({body}) => {
            expect(body.message).toBe('Invalid Request');

        })
      })

      test('should return 404 error when article id is invalid', () => {
        return supertest(app)
        .get('/api/articles/999')
        .expect(404)
        .then(({body}) => {
            expect(body.message).toBe('URL not found');

        })
    })

})

