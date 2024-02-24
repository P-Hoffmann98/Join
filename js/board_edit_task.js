let taskRecordSet;

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


function editTaskLoadValues(tasksIndex) {
    taskRecordSet = tasks[tasksIndex];
    console.log(taskRecordSet);
}


function editTaskFillInput() {
    document.getElementById('edit_task_title').value = taskRecordSet['title'];
    document.getElementById('edit_task_description').value = taskRecordSet['description'];
    document.getElementById('edit_task_due_date').value = taskRecordSet['dueDate'];
}


/**
 * The class add-task-prio-medium-pressed-button is added to the prio button medium and the colored image is exchanged for a white one
 */
function editTaskSelectedPrio(prioSelected) {
    const prioButton = document.getElementById('edit_task_prio_' + prioSelected);
    const prioButtonImg = document.getElementById('edit_task_img_prio_' + prioSelected);
    prioButton.classList.add('edit-task-prio-' + prioSelected + '-pressed-button');
    prioButtonImg.src = './img/board/prio_' + prioSelected + '_white.svg';
    console.log(prioButton);
   /*  document
      .getElementById("add_task_prio_medium")
      .classList.add("add-task-prio-medium-pressed-button");
    document.getElementById("add_task_img_prio_medium").src =
      "./img/add_task/prio_medium_white.svg";
    document
      .getElementById("add_task_prio_low")
      .classList.remove("add-task-prio-low-pressed-button");
    document.getElementById("add_task_img_prio_low").src =
      "./img/add_task/prio_low.svg";
    document
      .getElementById("add_task_prio_high")
      .classList.remove("add-task-prio-high-pressed-button");
    document.getElementById("add_task_img-prio-high").src =
      "./img/add_task/prio_high.svg";
    addTaskPrio = "medium"; */
  }