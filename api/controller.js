const {fetchTopics,fetchArticles, fetchArticlesById} = require('./model')


const getTopics  = (request,response,next) => {
    const {query} = request
    fetchTopics(query)
    .then(({rows})=> {
        response.status(200).send(rows);
        
    })
    .catch(next);
}


const getArticles  = (request,response,next) => {
    const {query} = request
    fetchArticles(query)
    .then(({rows})=> {
        response.status(200).send(rows);
        
    })
    .catch(next);
}


const getArticlesById = (request,response,next) => {
    const id = request.params
    fetchArticlesById(id)
    .then(()=> {
        return fetchArticlesById(id);
        
    })
    .then((articles) => {
        response.status(200).send({articles});
        
    })
    .catch(next);
}







module.exports = {getTopics, getArticles, getArticlesById }