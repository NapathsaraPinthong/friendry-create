const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "testfriendry",
    port: '3306'
})

db.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL database =', err)
        return;
    }
    else {
        console.log('MySQL successfully connected');
    }
})

app.post('/create-activity', async (req, res) => {
    const { name, category, capacity, description, location, equipment } = req.body;

    try {
        db.query(
            "INSERT INTO activity (name, category, capacity, description, location, equipment) VALUES(?,?,?,?,?,?)",
            [name, category, capacity, description, location, equipment],
            (err, results, fields) => {
                if (err) {
                    console.error('Error while inserting a user into the database', err);
                    return res.status(400).send();
                } else {
                    return res.status(201).json({ message: "New activity succesfully created" })
                }
            }
        )
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});

app.get("/locations", async (req, res) => {
    try {
        db.query(
            "SELECT roomID, name FROM location WHERE status = 'available'",
            (err, results, feilds) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json(results);
            }
        )
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

app.get("/equipments", async (req, res) => {
    try {
        db.query(
            "SELECT code, name FROM equipment WHERE quantity > 0",
            (err, results, feilds) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json(results);
            }
        )
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})