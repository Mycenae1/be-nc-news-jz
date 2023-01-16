const db = require("../db/connection");

const fetchTopics = (query) => {
    return db.query(`SELECT
        slug,
        description
        FROM topics
    `)
}



const fetchArticles = (query) => {
    return db.query(`SELECT
    author,
    title,
    article_id,
    topic,
    created_at,
    votes,
    article_img_url,
     FROM articles

     
    `)
}



module.exports = {fetchTopics,fetchArticles};