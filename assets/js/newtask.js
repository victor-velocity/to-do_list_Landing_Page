document.getElementById('addtaskform').addEventListener('submit', async function(event) {
    event.preventDefault();
    const description = document.getElementById('task-desc').value;
    const dueDate = document.getElementById('due-date').value;
  
    try {
      console.log(`Bearer ${localStorage.getItem('todoToken')}`)
      console.log(description, dueDate)
      // Send task data to backend
      const response = await fetch('https://todo-backend-nluz.onrender.com/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('todoToken')}`
        },
        body: JSON.stringify({
            "description": description,
            "dueDate": dueDate
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('todoToken', data.token);
        window.location.href = 'task.html';
      } else {
        document.getElementById('message').textContent = `Error: ${data.message || 'Unable to create task'}`;
      }
    } catch (error) {
      console.error('Error creating task:', error);
      document.getElementById('message').textContent = 'An error occurred. Please try again.';
    }
  });
  