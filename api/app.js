

const express = require('express');
const app = express();
app.use(express.json());
const {getTopics, getArticles} = require('./controller')

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)



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
    res.status(404).send({message: 'URL not found'});
  });
  




module.exports = app;