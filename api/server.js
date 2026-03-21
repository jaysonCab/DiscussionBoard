const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const express = require('express');
const app = express();

app.use(express.json());

app.get("/api", async function(req,res)
{
  console.log("GET COLLECTION REQUEST RECEIVED");
  
  const data = 
    await db.all("SELECT rowid as id, item, description FROM Collection");
  
  console.log(JSON.stringify(data));

  res.json(data);
});

app.delete("/api/:id", async function(req,res) {

  await db.run("DELETE FROM Collection WHERE rowid=?", [req.params.id]);
  
  res.json({"response": "ITEM DELETED"});

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
