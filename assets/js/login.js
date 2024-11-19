document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const response = await fetch('https://todo-backend-nluz.onrender.com/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
      });
      const data = await response.json();
      if (data) {
        window.location.href = 'task.html';
      } else {
        {throw new Error ('Invalid email or password')};
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  });

  