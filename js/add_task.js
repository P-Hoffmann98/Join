function addTaskInit() {
  includeHTML();
  addTaskSetPrioMedium();
  addTaskGetToday();
}

let addTaskPrio = "medium";

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

async function addTaskSave() {}

function saveCompleted() {}

function addTaskToVar() {}

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

function addTaskOpenContextMenuAssignedTo() {
  document
    .getElementById("add_task_select_user_box")
    .classList.toggle("d-none");
  //addTaskSearchName
}

function addTaskCloseContextMenuAssignedTo() {
  document.getElementById("add_task_select_user_box").classList.add("d-none");
  //addTaskSearchName
}

function addTaskSearchName() {}

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
