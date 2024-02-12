async function addTaskInit() {
  addTaskSetPrioMedium();
  addTaskGetToday();
  await loadTasks();
  await loadUsers();
  await loadContacts();
  renderSubTasks();
  loadCurrentUser();
  loadInitials();
  // let tasks = [];
  // await setItem("tasks", JSON.stringify(tasks));
  // let contacts = [];
  // await setItem("contacts", JSON.stringify(contacts));
  // let users = [];
  // await setItem("users", JSON.stringify(users));
}

let addTaskPrio = "medium";
let subtaskAddTask = [];
let categoryAddTask;
let dueDateAddTask;
let assignedToAddTask = [];
let descriptionAddTask;
let titleAddTask;
let statusSubtaskAddTask = [];
let selectUserBox;
let taskInput;
let prioMedium;
let prioMediumImg;

//Vaariablen für Fehlermeldung
let labelId;
let mistakeId;

//Variablen für Suchergebisse
let resultInitials;
let resultId;
let resultNames;

/**
 * This function sets the priority medium style at onload
 */
function addTaskSetPrioMedium() {
  prioMedium = document.getElementById("add_task_prio_medium");
  prioMedium.classList.add("add-task-prio-medium-pressed-button");
  prioMediumImg = document.getElementById("add_task_img_prio_medium");
  prioMediumImg.src = "./img/add-task-prio-medium.svg";
}

/**
 * Check if all required input field are filled
 * Requiered fields: title, due date, category
 */
function addTaskCheckForm() {
  if (
    document.getElementById("add_task_title").value.length > 0 &&
    document.getElementById("add_task_due_date").value.length > 0 &&
    document.getElementById("add_task_category").textContent !=
      "Select task category"
  ) {
    document.getElementById("add_task_button").classList.remove("d-none");
  } else {
    document.getElementById("add_task_button").classList.add("d-none");
  }
}

/**
 * input value from formular put in variable
 */
function addTaskToVar() {
  titleAddTask = document.getElementById("add_task_title").value;
  descriptionAddTask = document.getElementById("add_task_description").value;
  dueDateAddTask = document.getElementById("add_task_due_date").value;
  // subtaskAddTask = document.getElementById("add_task_subtask").value;
  addTaskSave();
}

/**
 * put all informations from formular to tasks JSON array
 * and put it to backendstorage
 */
async function addTaskSave() {
  tasks.push({
    id: Date.now(),
    autor: currentUser["userId"],
    title: titleAddTask,
    description: descriptionAddTask,
    assignedTo: assignedToAddTask,
    dueDate: dueDateAddTask,
    prio: addTaskPrio,
    categoryTask: categoryAddTask,
    subtask: subtaskAddTask,
    status_subtask: statusSubtaskAddTask,
    status: "todo",
  });

  await setItem("tasks", JSON.stringify(tasks));
  addTaskSaveCompleted();
}

/**
 * show message added done if save at backendstorage is complete
 */
function addTaskSaveCompleted() {
  document
    .getElementById("add_task_popup_container")
    .classList.remove("d-none");
  setTimeout(addTaskGoToBoard, 1000);
}

/**
 * redirects user to board page
 */
function addTaskGoToBoard() {
  window.location.href = "board.html";
}

/**
 * The class add-task-prio-low-pressed-button is added to the prio button low and the colored image is exchanged for a white one
 */
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

/**
 * The class add-task-prio-medium-pressed-button is added to the prio button medium and the colored image is exchanged for a white one
 */
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

/**
 * The class add-task-prio-high-pressed-button is added to the prio button high and the colored image is exchanged for a white one
 */
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

/**
 * set min attribut to input type date fr due date form field
 */
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

/**
 *The red frame around the input field if there is no input is hidden
 */
function removeRedBorder(param) {
  let labelId = "add_task_label_" + param;
  let mistakeId = "add_task_mistake_" + param;

  document.getElementById(labelId).classList.remove("borderColorMistake");
  document.getElementById(mistakeId).classList.add("d-none");
}

/**
 * The search results are saved in variables after entering them into the search field and function addTaskRenderSeaarchName and markSelectedContacts  are called
 */
function addTaskSearchName() {
  let searchInput = document.getElementById("add_task_assigned_to").value;
  searchInput = searchInput.toLowerCase();
  document.getElementById("add_task_select_user_box").innerHTML = ``;
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i]["name"].toLowerCase().includes(searchInput)) {
      resultNames = contacts[i]["name"];
      resultId = contacts[i]["id"];
      resultInitials = contacts[i]["initials"];
      resultColor = contacts[i]["color"];
      let selectContact = markSelectedContacts(resultId);
      addTaskRenderSearchName(selectContact);
    }
  }
}

/**
 *The contacts that are selected are shown in color
 * @param {number} id
 * @returns boolean true
 */
function markSelectedContacts(id) {
  if (assignedToAddTask.includes(id)) {
    return true;
  }
}

/**
 * If no entry is made, a red frame is placed around the text field and an error message is displayed
 * @param {title, dueDate, category} param
 */
function addTaskShowMsg(param) {
  labelId = "add_task_label_" + param;
  mistakeId = "add_task_mistake_" + param;
  document.getElementById(mistakeId).classList.remove("d-none");
  document.getElementById(labelId).classList.add("borderColorMistake");
}

/**
 * style class is added to the contact and the selection box is checked
 * @param {number of contact} id
 */
function addStyleToSelectedContact(id) {
  let resultIdIsInAssignedToAddTask = assignedToAddTask.includes(id);
  if (!resultIdIsInAssignedToAddTask) {
    document.getElementById(id).classList.add("selectedContact");
    document.getElementById("selectContactBox" + id).src =
      "./img/add_task_rectangle_check.svg";
    addContactToTask(id);
  } else {
    document.getElementById(id).classList.remove("selectedContact");
    document.getElementById("selectContactBox" + id).src =
      "./img/add_task_rectangle.svg";
    deleteContactFromTask(id);
  }
}

/**
 *
 * @param {number of contact} contactId
 */
function addContactToTask(contactId) {
  assignedToAddTask.push(contactId);
  renderSelectedContactsFromTask();
}

/**
 * Contact is deselected from the list of assigned to and the function renderSelectedContactsFromTask is called
 * @param {number of contact} contactId
 */

function deleteContactFromTask(contactId) {
  let resultIdToDelete = assignedToAddTask.indexOf(contactId);
  assignedToAddTask.splice(resultIdToDelete, 1);
  renderSelectedContactsFromTask();
}
/**
 * Category is selected If no entry is entered, an error message is displayed and the frame of the input field is marked red
 * @param {number of caegory} param
 */
function selectCategory(param) {
  categoryAddTask = param;
  if (param == 1) {
    document.getElementById("add_task_category").innerHTML = "Technical Task";
  } else if (param == 2) {
    document.getElementById("add_task_category").innerHTML = "User Story";
  }
  document
    .getElementById("add_task_select_category_box")
    .classList.add("d-none");
  document
    .getElementById("add_task_label_category")
    .classList.remove("borderColorMistake");
  document.getElementById("add_task_mistake_category").classList.add("d-none");
}

//######FÜR CONTACTS LISTE##################################################################
/**
 * Function to open the select user box div
 */
function addTaskOpenContextMenuAssignedTo() {
  // selectUserBox.style.display = "block";
  selectUserBox.classList.remove("d-none");
}

/**
 * Function to close the select user box div
 */
function addTaskCloseContextMenuAssignedTo() {
  // selectUserBox.style.display = "none";
  selectUserBox.classList.add("d-none");
}

/**
 * Event listener for the input field and the image
 * @param {click} event
 */
function handleOpenContextMenu(event) {
  event.stopPropagation();
  addTaskOpenContextMenuAssignedTo();
}

/**
 * Function to close the select user box div when clicked outside of itFunction to close the select user box div when clicked outside of it
 */
document.addEventListener("click", function (event) {
  if (!selectUserBox.contains(event.target) && event.target !== taskInput) {
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

/**
 * Function to open the select category box div
 */
function addTaskOpenContextMenuCategory() {
  document
    .getElementById("add_task_select_category_box")
    .classList.remove("d-none");
  document.getElementById(
    "add_task_category"
  ).innerHTML = `Select Task category`;
}

/**
 * Function to close the select category box div
 */
function addTaskCloseContextMenuCategory() {
  document
    .getElementById("add_task_select_category_box")
    .classList.add("d-none");
}

/**
 * a subtask is added to the task and then the functions clearSubTaskInput and renderSubTasks are executed
 */
function addSubtask() {
  let subtaskInput = document.getElementById("add_task_subtask").value;
  if (subtaskInput.length > 0) {
    subtaskAddTask.push(subtaskInput);
    statusSubtaskAddTask.push("do");
    clearSubTaskInput();
    renderSubTasks();
  }
}

/**
 * subtask can be edited, subtask is set in focus and the div container is set editable
 * @param {number f subtask} index
 */
function editSubTask(index) {
  let editContent = document.getElementById(`subtaskContent${index}`);
  editContent.contentEditable = true;
  editContent.focus();
  changeImagesByEditingSubtask(index);
}

/**
 *Images for editing and deleting the subtask are exchanged
 * @param {number of subtask} index
 */
function changeImagesByEditingSubtask(index) {
  document
    .getElementById(`img_add_subtask_check${index}`)
    .classList.remove("d-none");
  document.getElementById(`img_add_subtask${index}`).classList.add("d-none");
}

/**
 * The edited subtask is saved and the images are reset again
 * @param {number of subtasks} index
 */
function saveEditing(index) {
  let output = document.getElementById(`subtaskContent${index}`).innerHTML;
  subtaskAddTask[index] = output;
  document
    .getElementById(`img_add_subtask_check${index}`)
    .classList.add("d-none");
  document.getElementById(`img_add_subtask${index}`).classList.remove("d-none");
  renderSubTasks();
}

/**
 * the input field for the subtasks is cleared
 */
function clearSubTaskInput() {
  document.getElementById("add_task_subtask").value = ``;
  changeSubTaskImg();
}
/**
 * The images in the subtask input fled are exchanged after a text is entered
 */
function changeSubTaskImg() {
  if (document.getElementById("add_task_subtask").value.length > 0) {
    document.getElementById("add_task_subtask_img").src =
      "./img/add_task_check_small.png";
    document
      .getElementById("add_task_subtask_img")
      .classList.add("add-subtask-img");
  } else {
    document.getElementById("add_task_subtask_img").src =
      "./img/add-task-subtask.svg";
    document
      .getElementById("add_task_subtask_img")
      .classList.add("add-subtask-img");
  }
}

/**
 * the subtask is deleted
 * @param {number of subtask} index
 */
function deleteSubtask(index) {
  subtaskAddTask.splice(index, 1);
  statusSubtaskAddTask.splice(index, 1);
  renderSubTasks();
}
