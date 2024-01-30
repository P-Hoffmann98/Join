function addTaskInit() {
  includeHTML();
  addTaskSetPrioMedium();
  addTaskGetToday();
  loadTasks();
}

let addTaskPrio = "medium";
let subtaskAddTask;
let categoryAddTask;
let dueDateAddTask;
let assignedToAddTask;
let descriptionAddTask;
let titleAddTask;

function addTaskSetPrioMedium() {
  let prioMedium = document.getElementById("add_task_prio_medium");
  prioMedium.classList.add("add-task-prio-medium-pressed-button");
  let prioMediumImg = document.getElementById("add_task_img_prio_medium");
  prioMediumImg.src = "./img/add-task-prio-medium.svg";
}
function addTaskCheckForm() {
  if (
    document.getElementById("add_task_title").value.length > 0 &&
    document.getElementById("add_task_due_date").value.length > 0 &&
    document.getElementById("add_task_category").value.length > 0
  ) {
    document.getElementById("add_task_button").classList.remove("d-none");
  } else {
    document.getElementById("add_task_button").classList.add("d-none");
  }
}

function addTaskToVar() {
  titleAddTask = document.getElementById("add_task_title").value;
  descriptionAddTask = document.getElementById("add_task_description").value;
  assignedToAddTask = document.getElementById("add_task_assigned_to").value;
  dueDateAddTask = document.getElementById("add_task_due_date").value;
  categoryAddTask = document.getElementById("add_task_category").value;
  subtaskAddTask = document.getElementById("add_task_subtask").value;
  addTaskSave();
}

async function addTaskSave() {
  tasks.push({
    id: Date.now(),
    autor: "",
    title: titleAddTask,
    description: descriptionAddTask,
    assignedTo: assignedToAddTask,
    dueDate: dueDateAddTask,
    prio: addTaskPrio,
    category: categoryAddTask,
    subtask: subtaskAddTask,
    contacts: "",
    status: "todo",
  });

  await setItem("tasks", JSON.stringify(tasks));
  addTaskSaveCompleted();
}

function addTaskSaveCompleted() {
  document
    .getElementById("add_task_popup_container")
    .classList.remove("d-none");
  setTimeout(addTaskGoToBoard, 1000);
}

function addTaskGoToBoard() {
  window.location.href = "board.html";
}

function addTaskSelectedPrioLow() {
  document
    .getElementById("add_task_prio_low")
    .classList.add("add-task-prio-low-pressed-button");
  document.getElementById("add_task_img_prio_low").src =
    "./img/add-task-prio-low-white.svg";
  document
    .getElementById("add_task_prio_medium")
    .classList.remove("add-task-prio-medium-pressed-button");
  document.getElementById("add_task_img_prio_medium").src =
    "./img/add-task-prio-medium.png";
  document
    .getElementById("add_task_prio_high")
    .classList.remove("add-task-prio-high-pressed-button");
  document.getElementById("add_task_img-prio-high").src =
    "./img/add-task-prio-high.svg";
  addTaskPrio = "low";
}

function addTaskSelectedPrioMedium() {
  document
    .getElementById("add_task_prio_medium")
    .classList.add("add-task-prio-medium-pressed-button");
  document.getElementById("add_task_img_prio_medium").src =
    "./img/add-task-prio-medium-white.svg";
  document
    .getElementById("add_task_prio_low")
    .classList.remove("add-task-prio-low-pressed-button");
  document.getElementById("add_task_img_prio_low").src =
    "./img/add-task-prio-low.svg";
  document
    .getElementById("add_task_prio_high")
    .classList.remove("add-task-prio-high-pressed-button");
  document.getElementById("add_task_img-prio-high").src =
    "./img/add-task-prio-high.svg";
  addTaskPrio = "medium";
}

function addTaskSelectedPrioHigh() {
  document
    .getElementById("add_task_prio_high")
    .classList.add("add-task-prio-high-pressed-button");
  document.getElementById("add_task_img-prio-high").src =
    "./img/add-task-prio-high-white.svg";
  document
    .getElementById("add_task_prio_medium")
    .classList.remove("add-task-prio-medium-pressed-button");
  document.getElementById("add_task_img_prio_medium").src =
    "./img/add-task-prio-medium.png";
  document
    .getElementById("add_task_prio_low")
    .classList.remove("add-task-prio-low-pressed-button");
  document.getElementById("add_task_img_prio_low").src =
    "./img/add-task-prio-low.svg";
  addTaskPrio = "urgent";
}

function addTaskGetToday() {
  let today = new Date();
  let day = today.getDate(); // Tag
  // Monatsangabe startet bei 0!
  let month = today.getMonth() + 1; // Monat
  let year = today.getFullYear(); // Jahr
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  today = year + "-" + month + "-" + day;

  document.getElementById("add_task_due_date").min = today;
}

function addTaskSearchName() {
  console.log("1");
}

function addTaskRenderSearchName() {}

function addTaskShowTitleMsg() {
  document.getElementById("add_task_title_mistake").classList.remove("d-none");
  document
    .getElementById("add_task_label_title")
    .classList.add("borderColorMistake");
}

function addTaskShowDueDateMsg() {
  document
    .getElementById("add_task_mistake_due_date")
    .classList.remove("d-none");
  document
    .getElementById("add_task_label_dueDate")
    .classList.add("borderColorMistake");
}

function addTaskShowCategoryMsg() {
  document
    .getElementById("add_task_mistake_category")
    .classList.remove("d-none");
  document
    .getElementById("add_task_label_category")
    .classList.add("borderColorMistake");
}

//########################################################################

let selectUserBox;
let taskInput;

// Funktion, um das select user box div zu öffnen
function addTaskOpenContextMenuAssignedTo() {
  // selectUserBox.style.display = "block";
  selectUserBox.classList.remove("d-none");
}

// Funktion, um das select user box div zu schließen
function addTaskCloseContextMenuAssignedTo() {
  // selectUserBox.style.display = "none";
  selectUserBox.classList.add("d-none");
}

// Event-Listener für das Input-Feld und das Bild
function handleOpenContextMenu(event) {
  event.stopPropagation();
  addTaskOpenContextMenuAssignedTo();
}

// Funktion, um das select user box div zu schließen, wenn außerhalb davon geklickt wird
document.addEventListener("click", function (event) {
  if (
    !selectUserBox.contains(event.target) &&
    event.target !== taskInput
    // event.target !== imageElement
  ) {
    addTaskCloseContextMenuAssignedTo();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  selectUserBox = document.getElementById("add_task_select_user_box");
  taskInput = document.getElementById("add_task_assigned_to");
  taskInput.addEventListener("click", handleOpenContextMenu);

  // Event-Listener für das select user box div
  selectUserBox.addEventListener("click", function (event) {
    event.stopPropagation(); // Verhindert, dass das Klick-Ereignis nach außen durchsickert
  });
});

//################################################################################
