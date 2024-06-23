const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'static')));

app.use(cors()); // 允许所有来源的 CORS 请求

app.options('*', (req, res) => {
    res.sendStatus(200);
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

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
    const { riskType, celebType, investmentAmount } = req.body;
    console.log(`Received request with riskType: ${riskType}, celebType: ${celebType}, investmentAmount: ${investmentAmount}`);

    const pythonProcess = spawn('python3', ['recommend_stocks.py', riskType, celebType, investmentAmount]);

    let dataString = '';

    pythonProcess.stdout.on('data', (data) => {
        dataString += data.toString();
        console.log(`Python script output: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error from Python script: ${data.toString()}`);
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            try {
                const result = JSON.parse(dataString);
                console.log('Python script result:', result);
                res.status(200).json(result);
            } catch (e) {
                console.error('Error parsing JSON:', e);
                res.status(500).json({ message: 'Error parsing JSON' });
            }
        } else {
            console.error(`Python script exited with code: ${code}`);
            res.status(500).json({ message: 'Error generating investment combo' });
        }
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});


