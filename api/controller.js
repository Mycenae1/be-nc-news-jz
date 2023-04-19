const {
  fetchTopics,
  fetchArticles,
  fetchArticlesById,
  fetchComments,
  postComment,
  updateVotes,
  fetchUsers,
  deleteComment,
  fetchAllComments,
} = require("./model");

const getTopics = (request, response, next) => {
  const {query} = request;
  fetchTopics(query)
    .then(({rows}) => {
      response.status(200).send(rows);
    })
    .catch(next);
};

const getArticles = (request, response, next) => {
  const {query} = request;
  fetchArticles(query)
    .then(({rows}) => {
      response.status(200).send(rows);
    })
    .catch(next);
};

const getArticlesById = (request, response, next) => {
  const id = request.params;
  fetchArticlesById(id)
    .then(() => {
      return fetchArticlesById(id);
    })
    .then((articles) => {
      response.status(200).send({articles});
    })
    .catch(next);
};

const getComments = (request, response, next) => {
  const id = request.params;
  fetchComments(id)
    .then(() => {
      return fetchComments(id);
    })
    .then((comments) => {
      response.status(200).send(comments);
    })
    .catch(next);
};

const addComment = (request, response, next) => {
  const commentId = request.params;
  const {username, body} = request.body;
  postComment(commentId, {username, body})
    .then((comment) => {
      response.status(201).send(comment);
    })

    .catch(next);
};

const incrementVotes = (request, response, next) => {
  const id = request.params;
  const voteIncrement = request.body;

  updateVotes(id, voteIncrement)
    .then(() => {
      return updateVotes(id, voteIncrement);
    })
    .then((articles) => {
      response.status(202).send({articles});
    })
    .catch(next);
};

const getUsers = (request, response, next) => {
  const {query} = request;
  fetchUsers(query)
    .then(({rows}) => {
      response.status(200).send(rows);
    })
    .catch(next);
};

const getAllComments = (request, response, next) => {
  const {query} = request;
  fetchAllComments(query)
    .then(({rows}) => {
      response.status(200).send(rows);
    })
    .catch(next);
};

const removeComment = (request, response, next) => {
  const id = request.params.comment_id;
  console.log(id);
  deleteComment()
    .then(() => {
      return deleteComment(id);
    })
    .then((comment) => {
      if (!comment) {
        response.status(404).json({message: "Comment not found"});
      } else {
        response.status(204).send(comment);
        console.log(comment);
      }
    })
    .catch(next);
};

module.exports = {
  getTopics,
  getArticles,
  getArticlesById,
  getComments,
  addComment,
  incrementVotes,
  getUsers,
  removeComment,
  getAllComments,
};
