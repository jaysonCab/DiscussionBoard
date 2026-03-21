const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

async function startup()
{
  db = await sqlite.open({
    filename: 'database.db',
    driver: sqlite3.Database
  });
  
  await db.run("DROP TABLE IF EXISTS Collection");
  await db.run(`
      CREATE TABLE POSTS (
        TITLE TEXT,
        AUTHOR TEXT,
        EPISODE_NUMBER INTEGER,
        CONTENT TEXT
    )
  `);

}

startup();