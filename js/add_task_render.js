/**
 * The list of contacts is rendered and output in the div container add_task_select_user_box_
 * @param {color in HEX of contact} color
 */
function addTaskRenderSearchName(color) {
  document.getElementById(
    "add_task_select_user_box"
  ).innerHTML += `                     
            <div class="selectField" id="${resultId}" onclick="addStyleToSelectedContact(${resultId})">
              <span class="selectInitial dFlexAiCenterJcCenter" style="background-color:${resultColor}">${resultInitials}</span>
                <span class="selectName">${resultNames}</span>
                  <img src="./img/add_task_rectangle.svg" id="selectContactBox${resultId}">
            </div>`;
  if (color) {
    document.getElementById(resultId).classList.add("selectedContact");
    document.getElementById("selectContactBox" + resultId).src =
      "./img/add_task_rectangle_check.svg";
  }
}

/**
 * displays the selected contacts
 */
function renderSelectedContactsFromTask() {
  document.getElementById("outputSelectedContacts").innerHTML = ``;
  for (let i = 0; i < assignedToAddTask.length; i++) {
    for (let j = 0; j < contacts.length; j++) {
      if (assignedToAddTask[i] == contacts[j]["id"]) {
        document.getElementById(
          "outputSelectedContacts"
        ).innerHTML += `<span class="initialsOverview" style="background-color:${contacts[j]["color"]}">${contacts[j]["initials"]}</span>`;
      }
    }
  }
}

/**
 * the created subtasks are output
 */
function renderSubTasks() {
  let output = document.getElementById("outputSubtasks");
  output.innerHTML = ``;
  for (let i = 0; i < subtaskAddTask.length; i++) {
    output.innerHTML += `                        
      <div ondblclick="editSubTask(${i})" class="cursorPointer li"  contenteditable="false">
        &#8226;<span id="subtaskContent${i}"> ${subtaskAddTask[i]}</span>
          <div class="container_img_subtask">
            <img id="img_add_subtask_check${i}" src="./img/add_task_check_small.png" onclick="saveEditing(${i})" class="m-right20 cursorPointer d-none">
            <img id="img_add_subtask${i}" src="./img/add_task_edit_small.png" onclick="editSubTask(${i})" class="m-right20 cursorPointer">
            <img src="./img/add_task_delete_small.png" class="cursorPointer" onclick="deleteSubtask(${i})">
          </div>
      </div>`;
  }
}
