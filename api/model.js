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



const fetchArticlesById = (id) => {
    const myId = id.article_id;
    console.log(myId)
    return db.query(`SELECT
    articles.author,
    articles.title,
    articles.article_id,
    articles.body,
    articles.topic,
    articles.created_at,
    articles.votes,
    articles.article_img_url
    FROM articles
    JOIN comments
    ON articles.article_id = comments.article_id
    WHERE articles.article_id = ${myId}
    ;
   
   `)
   .then(({rows})=> {
    console.log(rows.length)
    if(rows.length === 0){
        return Promise.reject({ status: 404, message: 'URL not found' })
    
    }else {
    return  rows[0]
    }
})
   
    
};






module.exports = {fetchTopics,fetchArticles, fetchArticlesById};