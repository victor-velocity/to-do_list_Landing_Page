document.getElementById('addtaskform').addEventListener('submit', async function (event) {
  event.preventDefault();

  // Get input values
  const description = document.getElementById('taskDesc').value;
  const dueDate = document.getElementById('dueDate').value;

  // Debug values
  console.log("Description:", description);
  console.log("Due Date:", dueDate);
  console.log(`Bearer ${localStorage.getItem('todoToken')}`)

  // Check for empty values
  if (!description || !dueDate) {
    document.getElementById('message').textContent = 'Both fields are required!';
    return;
  }

  try {
    // Send task data to backend
    const response = await fetch('https://todo-backend-nluz.onrender.com/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('todoToken')}`
      },
      body: JSON.stringify({
        task: description,   // Use the correct key `task`
        due_date: dueDate    // Use the correct key `due_date`
      }),
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = 'task.html'; // Redirect on success
    } else {
      document.getElementById('message').textContent = `Error: ${data.message || 'Unable to create task'}`;
    }
  } catch (error) {
    console.error('Error creating task:', error);
    document.getElementById('message').textContent = 'An error occurred. Please try again.';
  }
});
