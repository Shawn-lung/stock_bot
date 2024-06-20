const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

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

// 检查用户名并插入或使用现有数据
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

// 获取问题的 API
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

// 提交答案的 API
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
