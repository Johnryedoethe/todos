// Adds a task to the list.
function addTask() {
  // read the input with .value and .trim()
  // trim the user input for convenience so the task when the task has extra spaces it cancels it
  const taskText = document.getElementById("task-text")
  const text = taskText.value.trim()

  // check if the input from the user is blank,
  // return so that an empty task will not be created
  if (text === "") {
    return
  }

  // Anchor to add a new task dynamically to create a list element
  const li = document.createElement("li")

  li.draggable = true;
  li.id = "task" + Date.now(); // unique ID
  li.addEventListener("dragstart", m => {
    m.dataTransfer.setData("text/plain", m.target.id);
  });

  // create an input type that is a checkbox, this will be done by a user
  // it will not be removed due to people wanting to check if they have done something
  let checkbox = document.createElement("input")
  // convert the type of input into a checkbox
  checkbox.type = "checkbox"
  checkbox.class = "checkBox"

  // create the text for the user to see the task
  //  this is the most improtant part as it shows the task created by the user
  const textElement = document.createElement("span");
  textElement.textContent = text;
  textElement.id = "textElem"

  // add an input for the user

  // const DateInput = document.createElement("input")
  // DateInput.type = "text"
  // let userDateInput = DateInput.value
  // let addTime = addTime.date(userDateInput)

  // delete a task with a button, check if it has been clicked with addEventListener
  const deleteButton = document.createElement("button")
  deleteButton.textContent = "Delete"
  deleteButton.id = "deleteButton"
  deleteButton.addEventListener("click", deleteTask)

  // anchor all the elements that will be created to the "li" element
  li.appendChild(checkbox)
  li.appendChild(textElement)
  // li.appendChild(addTime)
  li.appendChild(deleteButton)

  // appendChild dynamically adds the elements to the website through DOM manipulation
  // "tasks" is the ordered list that is referenced to display the text
  tasks.appendChild(li)

  // cut the input the user has put in
  // so that the user doesn't have to delete the text in the user input manually
  taskText.value = ""
}

// delete a task on the list with a button 
function deleteTask(deleteButtonClickEvent) {
  const clickedDeleteButton = deleteButtonClickEvent.target
  const li = clickedDeleteButton.parentNode
  li.remove()
}

// Load everything with setup
function setup() {
  // anchor the 3 elements already provided in the html file, the input, button and list
  const taskInput = document.getElementById("task-text")
  const addButton = document.getElementById("add-task")
  const tasks = document.getElementById("tasks")

  const saveTasks = []
  const sample = []

  // add tasks with "enter" to save time for the user
  taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTask()
      saveToArray()
    }
  }
  );

  function checkIfChecked(checkbox) {
    for (let i = 0; i++;) {
      if (checkbox.checked === true) {
        textElement.style.textDecoration = "line-through";
      }
    }

  }

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

  addButton.addEventListener("click", addTask,)
}
