const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const fullname = document.getElementById('full-name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await fetch('https://todo-backend-nluz.onrender.com/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullname, // No need for quotes in modern JS
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Save token only if response is successful
            if (data.token) {
                localStorage.setItem('todoToken', data.token);
                alert('Signup successful! Redirecting to login...');
                window.location.href = "login.html";
            } else {
                alert('Signup successful, but no token returned. Please log in.');
                window.location.href = "login.html";
            }
        } else {
            // Handle signup failure
            alert(`Signup failed: ${data.message || 'An error occurred'}`);
        }
    } catch (error) {
        console.error('Signup error:', error);
        alert('An error occurred during signup. Please try again.');
    }
});
