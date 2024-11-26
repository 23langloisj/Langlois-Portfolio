import sqlite3 from "sqlite3";
import exports from "sqlite3";

exports.handler = async function (event) { 
  const { name, message } = JSON.parse(event.body);

  if (!name || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Name and message are required." }),
    };
  }

  const db = new sqlite3.Database("./suggestions.db");

  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO suggestions (name, message) VALUES (?, ?)",
      [name, message],
      function (err) {
        if (err) {
          reject({ statusCode: 500, body: JSON.stringify({ message: "Server error" }) });
        } else {
          resolve({
            statusCode: 201,
            body: JSON.stringify({ id: this.lastID }),
          });
        }
      }
    );
  });
};
