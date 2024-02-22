function boardShowEditTask(tasksIndex) {
    document.getElementById('board_task_edit_task_main').classList.remove('d-none');
    document.getElementById('board_task_edit_task_main').classList.add('d-flex');
}


function boardCloseEditTask() {
    document.getElementById('board_task_edit_task_main').classList.add('d-none');
    document.getElementById('board_task_edit_task_main').classList.remove('d-flex');
}