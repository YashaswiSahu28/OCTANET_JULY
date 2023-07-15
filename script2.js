const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

// Array to store tasks
let tasks = [];

taskForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const taskNameInput = document.getElementById('task-name');
  const taskDeadlineInput = document.getElementById('task-deadline');
  const taskPriorityInput = document.getElementById('task-priority');
  const taskLabelInput = document.getElementById('task-label');

  const task = {
    name: taskNameInput.value,
    deadline: taskDeadlineInput.value,
    priority: taskPriorityInput.value,
    label: taskLabelInput.value
  };

  tasks.push(task);

  sortTasks();
  renderTasks();

  taskNameInput.value = '';
  taskDeadlineInput.value = '';
  taskPriorityInput.value = 'High';
  taskLabelInput.value = '';
});

function sortTasks() {
  tasks.sort((a, b) => {
    const deadlineA = new Date(a.deadline);
    const deadlineB = new Date(b.deadline);

    if (deadlineA < deadlineB) return -1;
    if (deadlineA > deadlineB) return 1;

    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';

    const taskInfo = document.createElement('div');
    taskInfo.className = 'task-info';
    taskInfo.innerHTML = `
      <p><strong>Name:</strong> ${task.name}</p>
      <p><strong>Deadline:</strong> ${task.deadline}</p>
      <p><strong>Priority:</strong> ${task.priority}</p>
      <p><strong>Label:</strong> ${task.label}</p>
    `;

    const deleteButton = document.createElement('span');
    deleteButton.className = 'delete-button';
    deleteButton.innerHTML = '&times;';
    deleteButton.addEventListener('click', function() {
      deleteTask(index);
    });

    taskElement.appendChild(taskInfo);
    taskElement.appendChild(deleteButton);
    taskList.appendChild(taskElement);
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}
