// .GET /api/topics

// Description
// Edit

// Responds with:

//     an array of topic objects, each of which should have the following properties:
//         slug
//         description

// As this is the first endpoint you will need to set up your testing suite.

// Errors handled

const express = require('express');
const app = express();
app.use(express.json());
const {getTopics} = require('./controller')

app.get('/api/topics', getTopics)





app.use((error, request, response, next) => {
    if(error.status){
        response.status(error.status).send({message: error.message})    
    } else {
        next(error);
    }
})


app.use((error, request, response, next) => {
    if(error){
    console.log(error);
    response.status(500).send({ message: 'Internal Server Error' });
    } else {
        next(error);
    }
    
})

app.use((req, res, next) => {
    res.status(404).send({message: 'URL not found'});
  });
  




module.exports = app;