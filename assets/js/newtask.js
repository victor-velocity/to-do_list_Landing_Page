document.getElementById('addtaskform').addEventListener('submit', async function (event) {
  event.preventDefault();

  const loader = document.getElementById("loader")
  const description = document.getElementById('taskDesc').value;
  const dueDate = document.getElementById('dueDate').value;


  if (!description || !dueDate) {
    document.getElementById('message').textContent = 'Both fields are required!';
  }

  try {
    loader.innerHTML = "<span id='loader'>Loading...</span>"
    const response = await fetch('https://todo-backend-nluz.onrender.com/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('todoToken')}`
      },
      body: JSON.stringify({
        task: description,
        due_date: dueDate
      }),
    });

    const data = await response.json();

    if (response.ok) {
      loader.innerHTML = "<span id='loader'>Success</span>"
      window.location.href = 'task.html';
    } else {
      loader.innerHTML = "<span id='loader'>Save</span>"
      document.getElementById('message').textContent = `Error: ${data.message || 'Unable to create task'}`;
    }
  } catch (error) {
    loader.innerHTML = "<span id='loader'>Save</span>"
    console.error('Error creating task:', error);
    document.getElementById('message').textContent = 'An error occurred. Please try again.';
  }
});
