const form = document.getElementById("to-do-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Check for existing tasks in local storage
let tasks;
if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
} else {
    tasks = [];
}

// Load existing tasks
tasks.forEach(function (task) {
    createTaskElement(task);
});

form.addEventListener("submit", addTask);

function addTask(e) {
    e.preventDefault();
    if (taskInput.value === "") {
        alert("Please enter a task");
        return;
    }
    const task = {
        text: taskInput.value,
        completed: false
    };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    createTaskElement(task);
    taskInput.value = "";
}

function createTaskElement(task) {
    const li = document.createElement("li");
    li.innerHTML = task.text;
    if (task.completed) {
        li.classList.add("completed");
    }
    taskList.appendChild(li);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.classList.add("delete-btn");
    li.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", deleteTask);
    li.addEventListener("click", toggleCompleted);
}

function deleteTask(e) {
    const taskLi = e.target.parentNode;
    taskList.removeChild(taskLi);
    const taskIndex = tasks.findIndex(function (task) {
        return task.text === taskLi.textContent;
    });
    tasks.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleCompleted(e) {
    const taskLi = e.target;
    taskLi.classList.toggle("completed");
    const taskIndex = tasks.findIndex(function (task) {
        return task.text === taskLi.textContent;
    });
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

