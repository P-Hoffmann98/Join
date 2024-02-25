let taskRecordSet;
let editSelectUserBox;
let editTaskInput;
let editAssignedToAddTask = [];
let changedPrio;

function boardShowEditTask(tasksIndex) {
  editTaskLoadValues(tasksIndex);
  editTaskFillInput();
  document.getElementById('board_task_edit_task_main').classList.remove('d-none');
  document.getElementById('board_task_edit_task_main').classList.add('d-flex');
}


function boardCloseEditTask() {
  document.getElementById('board_task_edit_task_main').classList.add('d-none');
  document.getElementById('board_task_edit_task_main').classList.remove('d-flex');
}


/**
 * Function load current values form current task
 * @param {index} tasksIndex Index of curretn task in tasks array
 */
function editTaskLoadValues(tasksIndex) {
  taskRecordSet = tasks[tasksIndex];
}


function editReadSelectedContacts() {
  editAssignedToAddTask = taskRecordSet['assignedTo'];
  editRenderSelectedContactsFromTask();
}


/**
 * Function fill the input fields ans selections of edt window, with current values of current task
 */
function editTaskFillInput() {
  document.getElementById('edit_task_title').value = taskRecordSet['title'];
  document.getElementById('edit_task_description').value = taskRecordSet['description'];
  document.getElementById('edit_task_due_date').value = taskRecordSet['dueDate'];
  editTaskSelectedPrio(taskRecordSet['prio']);
  editReadSelectedContacts();
}

/* **************************************** Prio Button rendern *********************************************************************** */
/**
 * function set slecetion of prio button from current task
 * @param {string} prioSelected prio value of current task
 */
function editTaskSelectedPrio(prioSelected) {
  const prioButton = document.getElementById('edit_task_prio_' + prioSelected);
  const prioButtonImg = document.getElementById('edit_task_img_prio_' + prioSelected);
  prioButton.classList.add('edit-task-prio-' + prioSelected + '-pressed-button');
  prioButtonImg.src = './img/board/prio_' + prioSelected + '_white.svg';
  editTaskRemoveSelectedPrio(prioSelected)
  changedPrio = prioSelected;
}


/**
 * function return a Array from non selected prio
 * @param {string} prioSelected current prio of current task
 * @returns Array from non selected prio
 */
function editTasksfindUnselectedPrio(prioSelected) {
  switch (prioSelected) {
    case 'urgent':
      return ['medium', 'low'];
      break;
    case 'medium':
      return ['urgent', 'low'];
      break;
    case 'low':
      return ['urgent', 'medium'];
      break;
    default:
      console.error('Wrong prio hand over in function board editTaskRemoveSelectedPrio()')
      break;
  }
}


/**
 * function remove prio highlight from non selcted prio button
 * @param {string} prioSelected current prio form current task
 */
function editTaskRemoveSelectedPrio(prioSelected) {
  let prioArr = editTasksfindUnselectedPrio(prioSelected);
  for (let i = 0; i < prioArr.length; i++) {
    const prioRemove = prioArr[i];
    const prioButton = document.getElementById('edit_task_prio_' + prioRemove);
    const prioButtonImg = document.getElementById('edit_task_img_prio_' + prioRemove);
    prioButton.classList.remove('edit-task-prio-' + prioRemove + '-pressed-button');
    prioButtonImg.src = './img/board/board_task_' + prioRemove + '.svg';
  }
}

/* ************************************ Auswahlbox Contacts rendern und füllen ******************************************************* */

/**
 * The search results are saved in variables after entering them into the search field and function addTaskRenderSeaarchName and markSelectedContacts  are called
 */
function editTaskSearchName() {
  let searchInput = document.getElementById('edit_task_assigned_to').value;
  searchInput = searchInput.toLowerCase();
  document.getElementById('edit_task_select_user_box').innerHTML = ``;
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i]["name"].toLowerCase().includes(searchInput)) {
      resultNames = contacts[i]["name"];
      resultId = contacts[i]["id"];
      resultInitials = contacts[i]["initials"];
      resultColor = contacts[i]["color"];
      let selectContact = editMarkSelectedContacts(resultId);
      editTaskRenderSearchName(selectContact);
    }
  }
}

/**
 * The list of contacts is rendered and output in the div container add_task_select_user_box_
 * @param {color in HEX of contact} color
 */
function editTaskRenderSearchName(color) {
  if (document.documentElement.clientWidth < 1300) {
    document.getElementById("rightContainer").classList.add("m-top270");
  }
  document.getElementById('edit_task_select_user_box').innerHTML += `                     
            <div class="edit-task-selectField" id="id${resultId}" onclick="editStyleToSelectedContact(${resultId})">
              <span class="edit-task-selectInitial dFlexAiCenterJcCenter" style="background-color:${resultColor}">${resultInitials}</span>
                <span class="edit-task-selectName">${resultNames}</span>
                  <img src="./img/board/rectangle.svg" id="editSelectContactBox${resultId}">
            </div>`;
  if (color) {
    document.getElementById(`id${resultId}`).classList.add("edit-selected-contact");
    document.getElementById("editSelectContactBox" + resultId).src =
      "./img/board/rectangle_check_white.svg";
  }
}

/**
* Function to open the select user box div
*/
function editTaskOpenContextMenuAssignedTo() {
  editSelectUserBox.classList.remove("d-none");
  document
    .getElementById("edit_task_assigned_to")
    .classList.add("edit-task-assigned-to-up");
}

/**
 * Function to close the select user box div
 */
function editTaskCloseContextMenuAssignedTo() {
  editSelectUserBox.classList.add("d-none");
  document
    .getElementById("edit_task_assigned_to")
    .classList.remove("edit-task-assigned-to-up");
  /* if (document.documentElement.clientWidth < 1300) {
    document.getElementById("rightContainer").classList.remove("m-top270"); 
  }*/
}

/**
 * Event listener for the input field and the image
 * @param {click} event
 */
function editTaskhandleOpenContextMenu(event) {
  event.stopPropagation();
  editTaskOpenContextMenuAssignedTo();
}

/**
 * Function to close the select user box div when clicked outside of itFunction to close the select user box div when clicked outside of it
 */
document.addEventListener("click", function (event) {
  if (!editSelectUserBox.contains(event.target) && event.target !== editTaskInput) {
    editTaskCloseContextMenuAssignedTo();
  }
});


document.addEventListener("DOMContentLoaded", function () {
  editSelectUserBox = document.getElementById("edit_task_select_user_box");
  editTaskInput = document.getElementById("edit_task_assigned_to");
  editTaskInput.addEventListener("click", editTaskhandleOpenContextMenu);

  editSelectUserBox.addEventListener("click", function (event) {
    event.stopPropagation();
  });
});

/* ************************************************ Ausgewählte Contacts lesen und rendern unter Contacts Menü ************************ */


/**
 * displays the selected contacts
 */
function editRenderSelectedContactsFromTask() {
  document.getElementById("editOutputSelectedContacts").innerHTML = ``;
  for (let i = 0; i < editAssignedToAddTask.length; i++) {
    for (let j = 0; j < contacts.length; j++) {
      if (editAssignedToAddTask[i] == contacts[j]["id"]) {
        document.getElementById(
          "editOutputSelectedContacts"
        ).innerHTML += `<div class="container edit-task-initialsOverview" style="background-color:${contacts[j]["color"]}">
                            <span onclick="editDeleteContactFromTask(${contacts[j]["id"]})">${contacts[j]["initials"]}</span>
                        </div>`;
      }
    }
  }
}


/**
 *The contacts that are selected are shown in color
 * @param {number} id
 * @returns boolean true
 */
 function editMarkSelectedContacts(id) {
  if (editAssignedToAddTask.includes(id)) {
    return true;
  }
}

/**
 * If no entry is made, a red frame is placed around the text field and an error message is displayed
 * @param {title, dueDate, category} param
 */
function addTaskShowMsg(param) {
  let labelId = "add_task_label_" + param;
  let mistakeId = "add_task_mistake_" + param;
  document.getElementById(mistakeId).classList.remove("d-none");
  document.getElementById(labelId).classList.add("board-edit-borderColor-mistake");
}

/**
 * style class is added to the contact and the selection box is checked
 * @param {number of contact} id
 */
function editStyleToSelectedContact(id) {
  let resultIdIsInAssignedToAddTask = editAssignedToAddTask.includes(id);
  if (!resultIdIsInAssignedToAddTask) {
    document.getElementById(`id${id}`).classList.add("edit-selected-contact");
    document.getElementById("editSelectContactBox" + id).src =
      "./img/board/rectangle_check_white.svg";
    editAddContactToTask(id);
  } else {
    document.getElementById(`id${id}`).classList.remove("edit-selected-contact");
    document.getElementById("editSelectContactBox" + id).src =
      "./img/board/rectangle.svg";
    editDeleteContactFromTask(id);
  }
}

/**
 *the selected contact is pushed in the array assignedTAddTask and the function renderSelectedContactsFromTask is executed
 * @param {number of contact} contactId
 */
function editAddContactToTask(contactId) {
  editAssignedToAddTask.push(contactId);
  editRenderSelectedContactsFromTask();
}

/**
 * Contact is deselected from the list of assigned to and the function renderSelectedContactsFromTask is called
 * @param {number of contact} contactId
 */
function editDeleteContactFromTask(contactId) {
  let resultIdToDelete = editAssignedToAddTask.indexOf(contactId);
  editAssignedToAddTask.splice(resultIdToDelete, 1);
  editRenderSelectedContactsFromTask();
}