const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connecting to your working MySQL (Port 3307)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'eduvibe_db',
    port: 3307 // Important: Using your new port!
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Success! Node.js is connected to EduVibe Database.');
});

// A route to get your subjects
app.get('/api/subjects', (req, res) => {
    db.query('SELECT * FROM subjects', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});