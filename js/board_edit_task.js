let taskRecordSet;
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
  console.log(taskRecordSet);
}


/**
 * Function fill the input fields ans selections of edt window, with current values of current task
 */
function editTaskFillInput() {
  document.getElementById('edit_task_title').value = taskRecordSet['title'];
  document.getElementById('edit_task_description').value = taskRecordSet['description'];
  document.getElementById('edit_task_due_date').value = taskRecordSet['dueDate'];
  editTaskSelectedPrio(taskRecordSet['prio']);
}


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