var checkbox

// Get tasks from localStorage
function getSavedTasks() {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
}


// Save tasks to localStorage
function saveTasksToStorage(tasksArr) {
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
  // console.log(localStorage.getItem("tasks"));
}


// Adds a task to the list.
function addTask(taskTextValue) {

  // If called with a value, use it (for loading), else get from input

  let text;
  if (typeof taskTextValue === "string") {
    text = taskTextValue.trim();
  } else {
    const taskText = document.getElementById("task-text");
    text = taskText.value.trim();
  }


  if (text === "") {
    return;
  }

  const li = document.createElement("li");
  li.draggable = true;

  li.id = "task" + Date.now();
  li.addEventListener("dragstart", m => {
    m.dataTransfer.setData("text/plain", m.target.id);
  });

  checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.class = "checkbox";

  // checkbox.checked = markAsChecked()

  // let timebox = document.createElement("input")
  // timebox.type = "datetime-local";
  // timebox.class = timebox;

  const textElement = document.createElement("span");
  textElement.textContent = text;
  textElement.id = "text-element";
  textElement.class = "text-elem"

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.id = "delete-button";
  deleteButton.addEventListener("click", deleteTask);

  li.appendChild(checkbox);
  li.appendChild(textElement);
  li.appendChild(deleteButton);
  // li.appendchuld(timebox)
  // append all 3 elements to the tasks element
  tasks.appendChild(li);

  // Only save if not loading from storage

  if (typeof taskTextValue !== "string") {
    // Save to localStorage
    const tasksArr = getSavedTasks();
    tasksArr.push(text);

    saveTasksToStorage(tasksArr);
    document.getElementById("task-text").value = "";
  }
}

// delete a task on the list with a button 
function deleteTask(deleteButtonClickEvent) {
  const clickedDeleteButton = deleteButtonClickEvent.target;

  const li = clickedDeleteButton.parentNode;
  const text = li.querySelector("span").textContent;
  li.remove();

  // Remove from localStorage
  let tasksArr = getSavedTasks();
  tasksArr = tasksArr.filter(t => t !== text);
  saveTasksToStorage(tasksArr);
}

// Load everything with setup
function setup() {
  // anchor the 3 elements already provided in the html file, the input, button and list
  const taskInput = document.getElementById("task-text")
  const addButton = document.getElementById("add-task")
  const tasks = document.getElementById("tasks")

  // Load tasks from localStorage
  const savedTasks = getSavedTasks();
  savedTasks.forEach(task => addTask(task));

  // add tasks with "enter" to save time for the user
  taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  }
  );

  // function markAsChecked() {
  //     if (checkbox.checked) {
  //       textElement.id = "textElemChecked"
  //     }
  // }

  // function saveToArray(saveTasks, li) {
  //   for (let i = 0; i < sample.length; i++) {
  //     saveTasks.push.toString(li)
  //     console.log(saveTasks)
  //   }
  // }


  //  testing if deleting a task is possible with backspace or delete, will likely not include
  // li.addEventListener("keydown", (event) => {
  //   if (event.key === "Backspace") {
  //     deleteTask()
  //   }
  // }
  // );

  // add the task with the button, reference the function
  // the function will activate and read the input, create new elements, 

  addButton.addEventListener("click", addTask)
}

// Run setup on page load
//document.addEventListener("DOMContentLoaded", setup);
