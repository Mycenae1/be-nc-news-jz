Please see link to hosted API: https://be-nc-news-jz.onrender.com/api/articles

Here has been built a PSQL API intended for the creation of a front-end news website project.
See all currently available endpoints;

"/api/topics" - For a list of topics.
"/api/articles" - For a list of all articles.
"/api/articles/:article_id" - For a specific article with a given id number.
"/api/articles/:article_id/comments" - For a list of comments on a specific article.
"/api/users" - For a list of users.
"/api/comments" - For a list of all comments.
"/api/comments/:comment_id" - Fo a specific comment with a given id.

To use this code please fork your own copy and use the URL to clone the repo onto your machine. `git clone https://be-nc-news-jz.onrender.com/api/articles `
If you have cloned your own copy of this code, please add your own two .env files, for development and testing.
Ensure these are included in .gitignore. `.env.\*`

Dependency installations required for the running of this code include;
Express https://expressjs.com/en/starter/installing.html,
Pg-Format https://www.npmjs.com/package/pg-format,
Jest https://jestjs.io/docs/getting-started,
Supertest https://www.npmjs.com/package/supertest

This project uses Husky to test the code before a commit can be made. https://typicode.github.io/husky/#/

The latest versions of Node.js and Postgres may be needed.
