const {fetchTopics,fetchArticles} = require('./model')


const getTopics  = (request,response,next) => {
    const {query} = request
    fetchTopics(query)
    .then(({rows})=> {
        console.log(rows)
        response.status(200).send(rows);
        
    })
    .catch(next);
}


const getArticles  = (request,response,next) => {
    const {query} = request
    fetchArticles(query)
    .then(({rows})=> {
        console.log(rows)
        response.status(200).send(rows);
        
    })
    .catch(next);
}






module.exports = {getTopics, getArticles}