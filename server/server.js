const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs")

const exercises_db = require('./database/exercises_db.js')
const sets_db = require('./database/sets_db.js')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/exercises", (req, res) => {
    let sql = "select * from exercise";
    let params = [];

    exercises_db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }

        res.json({
            "message": "success",
            "data": rows
        })
    })
})

app.post("/workout", (req, res) => {
    let datetime = req.body.datetime;
    let sets = req.body.sets;

    console.log(datetime);


    let sql = 'INSERT INTO sets(exercise_id, weight, reps) VALUES (?, ?)';
    let params;

    for (let exercise of Object.keys(sets)) {
        for (let set of sets[exercise]) {
            params = [exercise, set.weight, set.reps];

            sets_db.run(sql, [exercise, set.weight, set.reps]);
            console.log(exercise, set);
        }
    }

    res.json({message: "Transaction completed!"});
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
  