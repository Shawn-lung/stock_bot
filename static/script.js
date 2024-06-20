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

    fetch('http://localhost:3000/saveUserData', {
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
        // 重定向到下一页
        window.location.href = 'post.html';  // 替换为你的下一页的URL
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error saving data');
    });
});