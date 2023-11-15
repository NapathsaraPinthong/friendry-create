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


//Create Activity page
app.post('/create-activity', async (req, res) => {
    const { name, category, capacity, description, location, equipment, hostID } = req.body;

    try {
        db.query(
            "INSERT INTO activity (name, category, capacity, description, location, equipment, hostID) VALUES(?,?,?,?,?,?,?)",
            [name, category, capacity, description, location, equipment, hostID],
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
});


app.patch("/location/reserve", async (req, res) => {
    const roomID = req.body.roomID;
    try {
        db.query(
            "UPDATE location SET status = 'unavailable' WHERE roomID = ?", [roomID],
            (err, results, feilds) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json({ message: "location has reserved succesfully" });
            }
        )
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});

app.patch("/equipment/reserve", async (req, res) => {
    const code = req.body.code;
    try {
        db.query(
            "UPDATE equipment SET quantity = quantity-1 WHERE code = ?", [code],
            (err, results, feilds) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json({ message: "equipment has reserved succesfully" });
            }
        )
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});


//Host Management page
app.get("/host/activity/:id", async (req, res) => {

    const hostID = req.params.id;

    try {
        db.query(
            "SELECT a.activityID, a.name, a.description, a.category, a.capacity, l.name as room, l.address, e.name as equipment FROM activity a JOIN location l ON a.location = l.roomID JOIN equipment e ON a.equipment = e.code WHERE a.hostID = ?", [hostID],
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
});


app.get("/host/group/:id", async (req, res) => {

    const hostID = req.params.id;

    try {
        db.query(
            "SELECT u.fname, u.lname FROM user u JOIN activitygroup ag ON u.studentID = ag.studentID JOIN activity a ON a.activityID = ag.activityID WHERE a.hostID = ?", [hostID],
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
});

//Host Page
app.get("/hosts", async (req, res) => {

    try {
        db.query(
            "SELECT hostID FROM activity",
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
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})