const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "fullstack-project",
  port: 8889,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("mysql connected");
});

module.exports = db;
