

const express = require('express');
const app = express();
app.use(express.json());
const {getTopics, getArticles, getArticlesById} = require('./controller')

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id', getArticlesById)

app.use((error, request, response, next) => {
    if(error.status){
        response.status(error.status).send({message: error.message})    
    } else {
        next(error);
    }
})




app.use((error, request, response, next) => {
    if(error){
    response.status(500).send({ message: 'Internal Server Error' });
    }
    
})


app.use((req, res, next) => {
    res.status(400).send({message: 'Invalid Request'});
    next(error);
  });
  
  app.use((req, res, next) => {
    res.status(404).send({message: 'article id not found'});
    next(error);
  });







module.exports = app;