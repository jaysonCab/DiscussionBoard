const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const express = require('express');
const app = express();

app.use(express.json());

// CREATE TABLE POSTS (
//   TITLE TEXT,
//   AUTHOR TEXT,
//   EPISODE_NUMBER INTEGER,
//   CONTENT TEXT
// )

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
