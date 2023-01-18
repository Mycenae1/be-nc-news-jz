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
        .expect(404)
        .then(({body}) => {
            expect(body.message).toBe('URL not found');

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



describe.only('GET api/articles/:article_id', () => {
    test('should return a 200 status', () => {
        return supertest(app).get('/api/articles/1').expect(200)
    
    })
    test('should return an object representing the correct article', () => {
        return supertest(app).get('/api/articles/1').expect(200)
        .then(({body}) => {
            const bodySize = Object.keys({body}).length
            expect(bodySize).toEqual(1); 
            console.log(body.articles)
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