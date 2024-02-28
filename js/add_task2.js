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
  if (output.length == 0) {
    document
      .getElementById(`img_add_subtask_check${index}`)
      .classList.add("d-none");
  }
  subtaskAddTask[index] = output;
  document
    .getElementById(`img_add_subtask_check${index}`)
    .classList.add("d-none");
  document.getElementById(`img_add_subtask${index}`).classList.remove("d-none");
  renderSubTasks();
}

/**
 * check if editfield foor subtasks is empty or not
 * id empty save button not visibil
 * @param {number} index
 */
function checkSubTaskEditInput(index) {
  let output = document.getElementById(`subtaskContent${index}`).innerHTML;
  if (output.length == 0) {
    document
      .getElementById(`img_add_subtask_check${index}`)
      .classList.add("d-none");
  } else {
    document
      .getElementById(`img_add_subtask_check${index}`)
      .classList.remove("d-none");
  }
}

/**
 * the input field for the subtasks is cleared
 */
function clearSubTaskInput() {
  document.getElementById("add_task_subtask").value = ``;
  changeSubTaskImg();
}
/**
 * The images in the subtask input fled are changed after a text is entered
 */
function changeSubTaskImg() {
  if (document.getElementById("add_task_subtask").value.length > 0) {
    document.getElementById("add_task_subtask_img").src =
      "./img/add_task/check.svg";
    document
      .getElementById("add_task_subtask_img")
      .classList.add("add-subtask-img");
    document.getElementById("add_task_subtask_img").classList.remove("img1414");
  } else {
    document.getElementById("add_task_subtask_img").src =
      "./img/add_task/plus.svg";
    document
      .getElementById("add_task_subtask_img")
      .classList.add("add-subtask-img");
    document.getElementById("add_task_subtask_img").classList.add("img1414");
  }
}

/**
 * If you click on the body when changing a subtask, the new content is saved; if the new content has a length of 0, the subtask is deleted
 * @param {number} index
 */
function checkIfEditingIsEmpty(index) {
  let output = document.getElementById(`subtaskContent${index}`).innerHTML;
  if (output.length == 0) {
    deleteSubtask(index);
  } else {
    saveEditing(index);
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

/**
 *assignedTAddTask and subtaskAddTask are deleted and then renderSubTasks and renderSelectedContactsFromTask are executed
 */
function clearContactsAndSubtasks() {
  assignedToAddTask = [];
  subtaskAddTask = [];
  // addTaskSelectedPrioMedium();
  addTaskSelectedPriority("medium");
  removeRedBorder("title");
  removeRedBorder("dueDate");
  removeRedBorder("category");
  addTaskCloseContextMenuCategory();
  resetCategory();
  renderSubTasks();
  renderSelectedContactsFromTask();
}

/**
 * This function is executed when the enter key is pressed while the focus is on the input field with the id add_task_subtask
 * then the function add subtask is executed
 * @param {keypress} event
 */
document.addEventListener("DOMContentLoaded", function () {
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addSubtask();
    }
  }

  let subtaskInput = document.getElementById("add_task_subtask");
  if (subtaskInput) {
    subtaskInput.addEventListener("keypress", handleKeyPress);
  } else {
    console.error(
      "Element mit der ID 'add_task_subtask' wurde nicht gefunden."
    );
  }
});

function showToolsForSubtasks(id) {
  document.getElementById(`subtask_tools${id}`).classList.remove("d-none");
}

function hideToolsForSubtasks(id) {
  document.getElementById(`subtask_tools${id}`).classList.add("d-none");
}
