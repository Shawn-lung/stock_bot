const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'static')));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'new_user',
    password: 's04290429',
    database: 'my_database'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.post('/saveUserData', (req, res) => {
    const { name, age, gender, email } = req.body;

    const insertUserQuery = 'INSERT INTO users (name, age, gender, email) VALUES (?, ?, ?, ?)';
    connection.query(insertUserQuery, [name, age, gender, email], (err, results) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(200).json({ message: 'User already exists' });
            } else {
                console.error('Error inserting user:', err);
                res.status(500).json({ message: 'Error saving user' });
            }
            return;
        }
        res.status(200).json({ message: 'User saved successfully' });
    });
});

app.post('/submitAnswer', (req, res) => {
    const { user_id, question_id, selected_option, score } = req.body;
    const query = 'INSERT INTO user_answers (user_id, question_id, selected_option, score) VALUES (?, ?, ?, ?)';
    connection.query(query, [user_id, question_id, selected_option, score], (err, results) => {
        if (err) {
            console.error('Error submitting answer:', err);
            res.status(500).send('Error submitting answer');
            return;
        }
        res.status(200).json({ message: 'Answer submitted successfully' });
    });
});

app.get('/questions', (req, res) => {
    const contextId = req.query.contextId;
    const query = 'SELECT * FROM questions WHERE context_id = ?';
    connection.query(query, [contextId], (err, results) => {
        if (err) {
            console.error('Error fetching questions:', err);
            res.status(500).send('Error fetching questions');
            return;
        }
        res.status(200).json(results);
    });
});

app.post('/generateInvestmentCombo', (req, res) => {
    const { riskType } = req.body;
    const pythonProcess = spawn('python3', ['recommend_stocks.py', riskType]);

    pythonProcess.stdout.on('data', (data) => {
        const investmentCombo = data.toString();
        res.status(200).json({ investmentCombo });
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error('Error generating investment combo:', data.toString());
        res.status(500).send('Error generating investment combo');
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', req.path));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
