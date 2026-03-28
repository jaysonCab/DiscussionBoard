const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", async function(req,res) // app.get does GET method
{
  console.log("Api Route 1: Select all");
  
  const data = 
    await db.all(`
      SELECT rowid as ID,
      TITLE,
      AUTHOR,
      EPISODE_NUMBER,
      CONTENT
      FROM POSTS`
    );
  
  console.log(JSON.stringify(data));

  res.json(data);
});

app.post("/api", async function(req,res) // app.post performs the POST method
{
  console.log("Api Route 2: post request insert");
  
  // expand the request body into variables, similar to middleware in MVC pattern used before
  const { TITLE, AUTHOR, EPISODE_NUMBER, CONTENT } = req.body;

  await db.run(`
    INSERT INTO POSTS (TITLE, AUTHOR, EPISODE_NUMBER, CONTENT)
    VALUES (?, ?, ?, ?)
  `, [TITLE, AUTHOR, EPISODE_NUMBER, CONTENT]);

  res.send(`New record created`);
});

app.get("/api/:id", async function (req, res) {

  console.log("Api Route 3: Get single post");

  const id = req.params.id; // get the id from the URL parameter

  const post = await db.get(`
    SELECT 
      rowid AS ID,
      TITLE,
      AUTHOR,
      EPISODE_NUMBER,
      CONTENT
    FROM POSTS
    WHERE rowid = ?
  `, [id]);

  res.json(post);
});

app.delete("/api", async function(req, res) {
  console.log("Api Route 4: Delete all posts");

  await db.run(`
    DELETE FROM POSTS
  `);

  res.send("All posts deleted");
});

app.delete("/api/:id", async function(req, res) {
  console.log("Api Route 5: Delete specific post");
  const id = req.params.id;

  await db.run(`
    DELETE FROM POSTS
    WHERE rowid = ?
  `, [id]);

  res.send("Post deleted");
});

app.put("/api", async function(req, res) {
  console.log("Api Route 6: Replace entire collection"); // So basically truncate and load more than 1 record

  const posts = req.body; // An array of json objects, each representing a post

  await db.run(`DELETE FROM POSTS`); // Truncate first

  // Then load
  for (const post of posts) { // For loop to itterate over the array of posts | For each json object
    await db.run(`
      INSERT INTO POSTS (TITLE, AUTHOR, EPISODE_NUMBER, CONTENT)
      VALUES (?, ?, ?, ?)
    `, [post.TITLE, post.AUTHOR, post.EPISODE_NUMBER, post.CONTENT]);
  }

  res.send("Collection replaced");
});

app.put("/api/:id", async function(req, res) {
  console.log("Api Route 7: Update specific post");

  const id = req.params.id;
  const { TITLE, AUTHOR, EPISODE_NUMBER, CONTENT } = req.body;

  await db.run(`
    UPDATE POSTS
    SET TITLE = ?,
    AUTHOR = ?,
    EPISODE_NUMBER = ?,
    CONTENT = ?
    WHERE rowid = ?
  `, [TITLE, AUTHOR, EPISODE_NUMBER, CONTENT, id]);

  res.send(`Record id=${id} updated`);
});

async function startup()
{
  db = await sqlite.open({
    filename: 'database.db',
    driver: sqlite3.Database
  });

  const server = app.listen(3000, function(){
    console.log("RESTful API listening on port 3000!")
  });
}

startup();
