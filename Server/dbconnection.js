import mysql from "mysql2";

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  // password:
  database: "miniproject3",
});

const querySql = "SELECT * FROM testtable";

db.connect(function (err) {
  if (err) throw err;
  console.log("Database connected!");
  db.query(querySql, function (err, result) {
    if (err) throw err;
    console.log("Result: ", result);
    db.end();
  });
});
