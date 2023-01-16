const {fetchTopics} = require('./model')


const getTopics  = (request,response,next) => {
    const {query} = request
    fetchTopics(query)
    .then(({rows})=> {
        console.log(rows)
        response.status(200).send(rows);
        
    })
    .catch(next);
}




module.exports = {getTopics}