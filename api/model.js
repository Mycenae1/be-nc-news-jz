const db = require("../db/connection");

const fetchTopics = (query) => {
    return db.query(`SELECT
        slug,
        description
        FROM topics
    `)
}



module.exports = {fetchTopics};