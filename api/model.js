const db = require("../db/connection");
const articles = require("../db/data/test-data/articles");

const fetchTopics = (query) => {
    return db.query(`SELECT
        slug,
        description
        FROM topics
    `)
}




const fetchArticles = (query) => {
    return db.query(`SELECT
    articles.author,
    articles.title,
    articles.article_id,
    articles.topic,
    articles.created_at,
    articles.votes,
    articles.article_img_url,
    COUNT (comments.comment_id) AS comments_count
     FROM articles
    JOIN comments
    ON articles.article_id = comments.article_id
    GROUP BY 
    articles.article_id 
    ORDER BY 
    articles.created_at DESC;
 

     
    `)
    
};








module.exports = {fetchTopics,fetchArticles};