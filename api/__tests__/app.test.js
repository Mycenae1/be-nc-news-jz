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



describe('GET api/articles', () => {
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

    test('should return 404 error when url is not found', () => {
        return supertest(app)
        .get('/api/banana')
        .expect(404)
        .then(({body}) => {
            expect(body.message).toBe('URL not found');

        })
    })





})



