document.addEventListener('DOMContentLoaded', async () => {
    const taskList = document.querySelector('.task-list');
    const token = localStorage.getItem('todoToken');
    const modal = document.getElementById('task-modal');
    const deleteModal = document.getElementById('delete-modal');
    const modalForm = document.getElementById('addtaskform');
    const taskDescInput = document.getElementById('taskDesc');
    const dueDateInput = document.getElementById('dueDate');
    const loader = document.getElementById('loader');
    let editingTaskId = null;
    let deletingTaskId = null;

    try {
        const response = await fetch('https://todo-backend-nluz.onrender.com/api/tasks', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            taskList.innerHTML = `<h2>All Tasks</h2>`;
            if (data) {
                data.forEach((task, index) => {
                    const dueDate = task.due_date ? new Date(task.due_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    }) : 'No due date';

                    const taskItem = document.createElement('div');
                    taskItem.className = 'task-item';
                    taskItem.id = `task-${task._id}`;

                    const dropdownId = `dropdown-${index}`;

                    taskItem.innerHTML = `
                    <div class="task-info">
                        <div class="check"><i class="fa-solid fa-check"></i></div>
                        <div>
                            <div class="task-title">${task.task}</div>
                            <div class="task-time">${dueDate}</div>
                        </div>
                    </div>
                    <div class="editdiv">
                        <button class="dropdown-icon" onclick="toggleVisibility('${dropdownId}')">
                            <i class="fa fa-ellipsis-h"></i>
                        </button>
                        <div class="dropdown-content" id="${dropdownId}" style="display:none;">
                            <div class="dropdown-item" onclick="editTask('${String(task._id)}', '${task.task}', '${task.due_date}')">Edit</div>
                            <div class="dropdown-item" onclick="prepareDeleteTask('${String(task._id)}')">Delete</div>
                        </div>
                    </div>
                    `;
                    taskList.appendChild(taskItem);
                });
            } else {
                taskList.innerHTML = '<p>No tasks available.</p>';
            }
        } else {
            console.error('Error fetching tasks:', data.message || 'Unknown error');
            taskList.innerHTML = `<p>Error: ${data.message || 'Unable to load tasks'}</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        taskList.innerHTML = '<p>An error occurred while fetching tasks. Please try again.</p>';
    }

    // Edit Task Function
    window.editTask = function(taskId, taskDesc, dueDate) {
        editingTaskId = taskId;
        taskDescInput.value = taskDesc;

        if (dueDate) {
            const dueDateObj = new Date(dueDate);
            const formattedDate = dueDateObj.toISOString().split('T')[0];
            dueDateInput.value = formattedDate;
        } else {
            dueDateInput.value = '';
        }

        modal.style.display = 'block';
    };

    modalForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const updatedTaskDesc = taskDescInput.value;
        const updatedDueDate = dueDateInput.value;

        if (!updatedTaskDesc || !updatedDueDate) {
            alert("Please fill in both fields.");
            return;
        }

        try {
            const response = await fetch(`https://todo-backend-nluz.onrender.com/api/tasks/${editingTaskId}`, {
                method: 'PATCH',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    task: updatedTaskDesc,
                    due_date: updatedDueDate
                })
            });

            const data = await response.json();
            if (response.ok) {
                const updatedTaskItem = document.querySelector(`#task-${editingTaskId}`);
                if (updatedTaskItem) {
                    updatedTaskItem.querySelector('.task-title').textContent = updatedTaskDesc;
                    updatedTaskItem.querySelector('.task-time').textContent = new Date(updatedDueDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })
                }

                alert("Task updated successfully!");
                modal.style.display = 'none';
            } else {
                alert("Error updating task: " + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update task. Please try again later.');
        }
    });

    document.getElementById('cancel-button').addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Modal for deleting task
    window.prepareDeleteTask = function(taskId) {
        deletingTaskId = taskId;
        deleteModal.style.display = 'block';
    };

    document.getElementById('cancel-delete-button').addEventListener('click', function() {
        deleteModal.style.display = 'none';
    });

    document.getElementById('confirm-delete-button').addEventListener('click', async function() {
        if (deletingTaskId) {
            try {
                const response = await fetch(`https://todo-backend-nluz.onrender.com/api/tasks/${deletingTaskId}`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await response.json();
                if (response.ok) {
                    const taskToDelete = document.querySelector(`#task-${deletingTaskId}`);
                    if (taskToDelete) {
                        taskToDelete.remove();
                    }

                    alert("Task deleted successfully!");
                    deleteModal.style.display = 'none';
                } else {
                    alert("Error deleting task: " + data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to delete task. Please try again later.');
            }
        }
    });
});

function toggleVisibility(dropdownId) {
    const allDropdowns = document.querySelectorAll('.dropdown-content');
    allDropdowns.forEach(dropdown => {
        if (dropdown.id !== dropdownId) {
            dropdown.style.display = 'none';
        }
    });

    const dropdown = document.getElementById(dropdownId);
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}
