const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const loader = document.getElementById("spinner")
        const fullname = document.getElementById('full-name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        loader.innerHTML = "<span id='spinner'>Loading....</span>"

        const response = await fetch('https://todo-backend-nluz.onrender.com/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullname,
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            if (data.token) {
                localStorage.setItem('todoToken', data.token);
                loader.innerHTML = "<span id='spinner'>Successful</span>"
                window.location.href = "login.html";
            }
        } else {
            alert(`Signup failed: ${data.message || 'An error occurred'}`);
            loader.innerHTML = "<span id='spinner'>Create Account</span>"
        }
    } catch (error) {
        console.error('Signup error:', error);
        alert('An error occurred during signup. Please try again.');
        loader.innerHTML = "<span id='spinner'>Create Account</span>"
    }
});
