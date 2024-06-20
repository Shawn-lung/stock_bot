let currentQuestionIndex = 0;
let questions = [];
let totalScore = 0;
let contextId = 1;  // 假设情境ID为1，可以根据实际情况动态设置

document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    contextId = params.get('contextId') || contextId;

    fetchQuestions(contextId);
});

function fetchQuestions(contextId) {
    fetch(`http://localhost:3000/questions?contextId=${contextId}`)
        .then(response => response.json())
        .then(data => {
            questions = data;
            displayQuestion();
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
        });
}

function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        document.getElementById('question-text').innerText = question.question;
        document.getElementById('option-a').innerText = question.option_a;
        document.getElementById('option-b').innerText = question.option_b;
        document.getElementById('option-c').innerText = question.option_c;
        document.getElementById('option-d').innerText = question.option_d;
    } else {
        navigateBasedOnScore(totalScore);
    }
}

function submitAnswer(option) {
    const question = questions[currentQuestionIndex];
    const score = getScore(option);
    totalScore += score;
    fetch('http://localhost:3000/submitAnswer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: 1,  // 假设用户ID为1
            question_id: question.id,
            selected_option: option,
            score: score
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Answer submitted:', data);
        currentQuestionIndex++;
        displayQuestion();
    })
    .catch(error => {
        console.error('Error submitting answer:', error);
    });
}

function getScore(option) {
    switch (option) {
        case 'A': return 1;
        case 'B': return 2;
        case 'C': return 3;
        case 'D': return 4;
        default: return 0;
    }
}

function navigateBasedOnScore(totalScore) {
    let scoreRange = '';
    if (totalScore >= 4 && totalScore <= 7) {
        scoreRange = '4-7';
    } else if (totalScore >= 8 && totalScore <= 10) {
        scoreRange = '8-10';
    } else if (totalScore >= 11 && totalScore <= 14) {
        scoreRange = '11-14';
    } else if (totalScore >= 15 && totalScore <= 17) {
        scoreRange = '15-17';
    } else if (totalScore >= 18 && totalScore <= 20) {
        scoreRange = '18-20';
    }
    window.location.href = `introduction.html?scoreRange=${scoreRange}`;
}
