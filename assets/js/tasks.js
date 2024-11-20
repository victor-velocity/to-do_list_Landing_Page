document.addEventListener('DOMContentLoaded', async () => {
    const taskList = document.querySelector('.task-list');
    const token = localStorage.getItem('todoToken'); // Retrieve token from localStorage

    try {
        // Fetch tasks from the backend
        const response = await fetch('https://todo-backend-nluz.onrender.com/api/tasks', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            // Clear existing tasks (if any)
            taskList.innerHTML = `<h2>All Tasks</h2>`;
            console.log(data)

            // If there are tasks, display them
            if (data) {
                data.forEach(task => {
                    const dueDate = task.due_date ? new Date(task.due_date).toLocaleString() : 'No due date';
                    const taskItem = document.createElement('div');
                    taskItem.className = 'task-item';

                    taskItem.innerHTML = `
                <div class="task-info">
                <input type="checkbox">
                    <div>
                        <div class="task-title">${task.task}</div>
                        <div class="task-time">${dueDate}</div>
                    </div>
                </div>
                <div class="editdiv">
                <button class="dropdown-icon" onclick="toggleVisibility()">
                    <i class="fa fa-ellipsis-h"></i> <!-- Icon for the dropdown -->
                </button>
                <div class="dropdown-content" id="myDiv">
                    <div class="dropdown-item" onclick="editTask()">Edit</div>
                    <div class="dropdown-item" onclick="deleteTask()">Delete</div>
                </div>
                </div>
            `;
                    taskList.appendChild(taskItem);
                });
            } else {
                taskList.innerHTML += '<p>No tasks available.</p>';
            }
        } else {
            console.error('Error fetching tasks:', data.message || 'Unknown error');
            taskList.innerHTML += `<p>Error: ${data.message || 'Unable to load tasks'}</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        taskList.innerHTML += '<p>An error occurred while fetching tasks. Please try again.</p>';
    }
});

function toggleVisibility() {
    const element = document.getElementById('myDiv');
    
    // Toggle the display style
    if (element.style.display === 'none') {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  }
  

function editTask() {
    document.getElementById('action-result').textContent = 'Edit action triggered';
}

function deleteTask() {
    document.getElementById('action-result').textContent = 'Delete action triggered';
}

