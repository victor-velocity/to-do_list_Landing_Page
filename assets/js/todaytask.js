// Sample tasks array (replace this with your actual tasks data)
const tasks = [
    { task: "Buy groceries", due_date: "2024-11-23" },
    { task: "Complete project", due_date: "2024-11-24" },
    { task: "Call doctor", due_date: "2024-11-23" },
  ];
  
  // Function to format dates to match YYYY-MM-DD
  function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  
  // Function to render tasks for today
  function renderTodayTasks() {
    const taskList = document.querySelector(".task-list");
    const today = formatDate(new Date());
  
    // Filter tasks for today
    const todayTasks = tasks.filter((task) => task.due_date === today);
  
    // Clear previous tasks
    taskList.innerHTML = `
      <h2>Today</h2>
      ${todayTasks.length === 0 ? "<p>No tasks for today!</p>" : ""}
    `;
  
    // Add each task to the list
    todayTasks.forEach((task, index) => {
      const dropdownId = `dropdown-${index}`;
      const taskHTML = `
        <div class="task-item">
          <div class="task-info">
            <input type="checkbox" />
            <div>
              <div class="task-title">${task.task}</div>
              <div class="task-time">${task.due_date}</div>
            </div>
          </div>
          <div class="editdiv">
            <button class="dropdown-icon" onclick="toggleVisibility('${dropdownId}')">
              <i class="fa fa-ellipsis-h"></i>
            </button>
            <div class="dropdown-content" id="${dropdownId}" style="display:none;">
              <div class="dropdown-item" onclick="editTask('${index}', '${task.task}', '${task.due_date}')">Edit</div>
              <div class="dropdown-item" onclick="prepareDeleteTask('${index}')">Delete</div>
            </div>
          </div>
        </div>
      `;
      taskList.insertAdjacentHTML("beforeend", taskHTML);
    });
  }
  
  // Initialize the task list on page load
  document.addEventListener("DOMContentLoaded", renderTodayTasks);
  
  // Helper functions for dropdown actions (optional functionality)
  function toggleVisibility(id) {
    const dropdown = document.getElementById(id);
    dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
  }
  
  function editTask(id, taskName, dueDate) {
    console.log(`Editing Task ID: ${id}, Name: ${taskName}, Due Date: ${dueDate}`);
  }
  
  function prepareDeleteTask(id) {
    console.log(`Deleting Task ID: ${id}`);
  }
  