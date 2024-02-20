function boardShowAddTask(taskStatus) {
    addTaskInit();
    document.getElementById('board_task_add_task_main').classList.remove('d-none');
    document.getElementById('board_task_add_task_main').classList.add('d-flex');
    boardTaskStatus = taskStatus;
}


function boardCloseAddTask() {
    let tasksCategoryDiv = document.getElementById('board_add_task_div');
    tasksCategoryDiv.parentElement.classList.add('d-none');
    tasksCategoryDiv.parentElement.classList.remove('d-flex');
    clearContactsAndSubtasks();
}