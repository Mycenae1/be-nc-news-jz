const {fetchTopics,fetchArticles, fetchArticlesById, fetchComments, postComment} = require('./model')


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


const getComments = (request,response,next) => {
    const id = request.params
    fetchComments(id)
    .then(()=> {
        return fetchComments(id);
        
    })
    .then((comments) => {
        response.status(200).send(comments);
        
    })
    .catch(next);
}








const addComment = (request,response,next) => {
    const commentId = request.params;
    const {username, body} = request.body;
    postComment(commentId,{username, body} )
    .then(() =>{
            return postComment(commentId,{username, body})
        })
        .then((comment) => {
            response.status(201).send(comment)
        })
    
    .catch(next);
}





module.exports = {getTopics, getArticles, getArticlesById, getComments, addComment }