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
    /* document.getElementById('edit_task_due_date').defaultValue = taskRecordSet['dueDate']; */
    document.getElementById('edit_task_due_date').value = taskRecordSet['dueDate'];
}