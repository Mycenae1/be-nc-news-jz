const db = require("../db/connection");
const articles = require("../db/data/test-data/articles");

const fetchTopics = (query) => {
  return db.query(`SELECT
        slug,
        description
        FROM topics
    `);
};

const fetchArticles = (query) => {
  const {order, sort_by, topic} = query;
  const acceptedSortBys = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "article_img_url",
  ];
  const acceptedOrders = ["ASC", "DESC"];
  const acceptedTopics = ["cats", "mitch", "paper"];
  const toInput = [];

  sort_by === undefined ? toInput.push("created_at") : toInput.push(sort_by);
  order === undefined
    ? toInput.push("DESC")
    : toInput.push(order.toUpperCase());
  topic === undefined
    ? toInput.push("")
    : toInput.push(`WHERE articles.topic = '${topic}'`);

  if (!acceptedSortBys.includes(toInput[0])) {
    return Promise.reject({status: 400, message: "bad request"});
  }

  if (!acceptedOrders.includes(toInput[1])) {
    return Promise.reject({status: 400, message: "bad request"});
  }

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
    ON articles.article_id = comments.article_id  ${toInput[2]}
    GROUP BY 
    articles.article_id 
    ORDER BY 
    ${toInput[0]} ${toInput[1]}
 

     
    ;`);
};

const articleById = `articles.author,
    articles.title,
    articles.article_id,
    articles.body,
    articles.topic,
    articles.created_at,
    articles.votes,
    articles.article_img_url`;

const fetchArticlesById = (id) => {
  const myId = id.article_id;
  return db
    .query(
      `SELECT
        ${articleById},
    COUNT(comments.comment_id) AS comment_count
    FROM articles
    JOIN comments
    ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY
 ${articleById};
    ;
   
   `,
      [myId]
    )
    .then(({rows}) => {
      if (rows.length === 0) {
        return Promise.reject({status: 404, message: "URL not found"});
      } else {
        return rows[0];
      }
    });
};

const fetchComments = (id) => {
  const myId = +id.article_id;
  return db
    .query(
      `SELECT
    *
    FROM comments
    WHERE comments.article_id = $1
    ORDER BY comments.created_at  ; `,
      [myId]
    )

    .then(({rows}) => {
      if (rows.length === 0) {
        return Promise.reject({status: 200, message: "Comments not found"});
      } else {
        return rows;
      }
    });
};

const postComment = (id, comment) => {
  const myId = +id.article_id;
  return db
    .query(
      `INSERT INTO comments (
                article_id, 
                author,
                body
                
                
            ) VALUES ($1, $2, $3) RETURNING *;`,
      [myId, comment.username, comment.body]
    )
    .then((result) => {
      return result.rows[0];
    });
};

const updateVotes = (id, number) => {
  const myId = id.article_id;
  return db
    .query(
      `UPDATE articles
        SET votes = votes + ${number.inc_votes}
        WHERE articles.article_id = $1
        RETURNING *;`,
      [myId]
    )
    .then((result) => {
      return result.rows[0];
    });
};

const fetchUsers = (query) => {
  return db.query(`SELECT
       username,
       name,
       avatar_url

        FROM users
    `);
};

const fetchAllComments = (query) => {
  return db.query(`SELECT
       *

        FROM comments
    `);
};

const deleteComment = (id) => {
  return db
    .query(
      `DELETE FROM comments 
       WHERE comment_id = $1 AND EXISTS(SELECT 1 FROM comments WHERE comment_id = $1) RETURNING *;`,
      [id]
    )
    .then(({rows}) => {
      console.log(rows.length);
      console.log(rows);

      return rows[0];
    });
};

module.exports = {
  fetchTopics,
  fetchArticles,
  fetchArticlesById,
  fetchComments,
  postComment,
  updateVotes,
  fetchUsers,
  deleteComment,
  fetchAllComments,
};
