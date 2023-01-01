const sqlite3 = require('sqlite3').verbose()
const md5 = require('md5')
const fs = require('fs')

const DBSOURCE = "db.sqlite"

let sets_db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Error opening the database
        console.log(err.message);
        throw err;
    } else {
        console.log("A connection was established with the sets database!")
        sets_db.run(
            `
            CREATE TABLE sets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                exercise_id INTEGER NOT NULL,
                weight INTEGER,
                reps INTEGER,
                FOREIGN KEY (exercise_id) REFERENCES exercise(id)
            )
            `,
            (err) => {
                if (err) {
                    console.log(err.message);
                    throw err;
                }
            }
        )
    }
})

module.exports = sets_db;