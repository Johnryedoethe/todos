// Get tasks from localStorage
const getSavedTasks = () => {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
}

// Save tasks to localStorage
const saveTasksToStorage = (tasksArr) => {
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
}

// Add a task to the list
function addTask(taskObj) {
  let text;
  let done;

  // key values/objects to check if a task has been completed or not
  if (taskObj) {
    text = taskObj.text.trim();
    done = !!taskObj.done;
  } else {
    const taskText = document.getElementById("task-text");
    text = taskText.value.trim();
    done = false;
  }

  if (text === "") {
    return;
  }

  const li = document.createElement("li");
  li.id = "task"

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkbox";
  checkbox.checked = done;

  const textElement = document.createElement("span");
  textElement.textContent = text;
  textElement.id = "text-element";
  textElement.className = "text-elem";
  if (done) {
    textElement.style.textDecoration = "line-through";
    textElement.style.color = "#aaa";
  }

  checkbox.addEventListener("change", () => {
    // Update strikethrough
    if (checkbox.checked) {
      textElement.style.textDecoration = "line-through";
      textElement.style.color = "#aaa";
    } else {
      textElement.style.textDecoration = "none";
      textElement.style.color = "#222";
    }

    // Update to localStorage
    let tasksArr = getSavedTasks();
    tasksArr = tasksArr.map(t =>
      (t.text === text) ? { text: t.text, done: checkbox.checked } : t
    )
    saveTasksToStorage(tasksArr);
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.id = "delete-button";
  deleteButton.addEventListener("click", deleteTask);

  // render tasks dynamically
  li.appendChild(checkbox);
  li.appendChild(textElement);
  li.appendChild(deleteButton);
  tasks.appendChild(li);

  // Only save if not loading from storage
  if (taskObj === undefined) {

    // Save to localStorage
    const tasksArr = getSavedTasks();
    tasksArr.push({ text: text, done: false });
    saveTasksToStorage(tasksArr);
    document.getElementById("task-text").value = "";
  }
}

// delete a task on the list with a button 
const deleteTask = (deleteButtonClickEvent) => {
  const clickedDeleteButton = deleteButtonClickEvent.target;
  const li = clickedDeleteButton.parentNode;
  const text = li.querySelector("span").textContent;
  li.remove();

  // Remove from localStorage
  let tasksArr = getSavedTasks();
  tasksArr = tasksArr.filter(t => t.text !== text);
  saveTasksToStorage(tasksArr);
}

// Load everything with setup function first, this includes the tasks
function setup() {

  // anchor the 3 elements already provided in the html file, the input, button and list
  const taskInput = document.getElementById("task-text");
  const addButton = document.getElementById("add-task");
  tasks = document.getElementById("tasks");

  // Load tasks from localStorage
  const savedTasks = getSavedTasks();
  savedTasks.forEach(task => addTask(task));

  // add tasks with "enter" for convenience for the user
  taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // add tasks with a button
  addButton.addEventListener("click", () => addTask());
}
