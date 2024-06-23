document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const email = document.getElementById('email').value;

    const userData = {
        name: name,
        age: age,
        gender: gender,
        email: email
    };

    const apiBaseURL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://shawn-lung.github.io';

    fetch(`${apiBaseURL}/saveUserData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'User already exists') {
            alert('User already exists. Using existing data.');
        } else {
            alert('User saved successfully.');
        }
        window.location.href = 'post.html';
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error saving data');
    });
});
