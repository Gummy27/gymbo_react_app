const sqlite3 = require('sqlite3').verbose()
const md5 = require('md5')
const fs = require('fs')

const DBSOURCE = "db.sqlite"

let exercises_db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Error opening the database
        console.log(err.message);
        throw err;
    } else {
        console.log("A connection was established with the exercises database!");
        exercises_db.run(
            `
            CREATE TABLE exercises (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name text
            )
            `,
        (err) => {
            if (err) {
                // The table has been created!
                console.log("The table has been created")
            }
            else {
                console.log("Writing exercises to database")
                fs.readFile('server/data/exercises.json', 'utf-8', (read_err, data) => {
                    if (read_err) {
                        return;
                    }

                    let json_data = JSON.parse(data);
                    let insert = 'INSERT INTO exercises (name) VALUES (?)'

                    for(let exercise of json_data.exercises) {
                        exercises_db.run(insert, [exercise]);
                    }
                })
            }
        })
    }
})

module.exports = exercises_db;