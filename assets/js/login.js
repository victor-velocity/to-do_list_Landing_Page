document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const loader = document.getElementById('loader');
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    loader.innerHTML = "<span id='loader'>Loading...</span>"
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
      if (data.token) {
        localStorage.setItem('todoToken', data.token);
        loader.innerHTML = "<span id='loader'>Success</span>"
        window.location.href = 'task.html';
      } else {
        alert('no token returned. Please log in.');
        loader.innerHTML = "<span id='loader'>Log in</span>"
      }

    } else {
      { throw new Error('Invalid email or password') };
    }
  } catch (error) {
    console.error('Error logging in:', error);
    alert("wrong username or password")
    loader.innerHTML = "<span id='loader'>Log in</span>"
  }
});

