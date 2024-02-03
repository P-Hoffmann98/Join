let boardTasksToDo = [];
let boardTasksProgress = [];
let boardTasksFeedback = [];
let boardTasksDone = [];


/**
 * function to initialize the board.html if it will load
 */
async function boardInit() {
    await includeHTML();
    await loadTasks();
    await boardReadTasks();
    boardRenderTasksPlaceholder('board_task_category_todo');
    boardRenderTasksPreview(boardTasksToDo, 'board_task_category_todo');
}


/**
 * function read tasks from tasks-json and start function boardSortTasks()
 */
async function boardReadTasks() {
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        boardSortTasks(task['id'], task['status'])
    }
}


/**
 * function to sort the tasks into arrays sortet by status. 
 * @param {number} id  task-id value tio push into sort-array
 * @param {string} status to decide to push in witch array
 */
function boardSortTasks(id, status) {
    switch (status) {
        case 'todo':
            boardTasksToDo.push(id);
            break;
        case 'progress':
            boardTasksProgress.push(id);
            break;
        case 'feedback':
            boardTasksFeedback.push(id);
            break;
        case 'done':
            boardTasksDone.push(id);
            break;
        default:
            console.warn = "Wrong status in tasksArray";
    }
}


function boardIndexOfTasks(id) {

    /* for (let i = 0; i < boardTasksToDo.length; i++) {

        const id = boardTasksToDo[i]; */

    for (let j = 0; j < tasks.length; j++) {
        const task = tasks[j];


        if (task['id'] == id) {
            console.log(task['id']);
            console.log(id);
            console.log(j);
            return j;
        }
    }
    /* } */
}


function boardGetNameStatusCategory(tasksCategory) {
    switch (tasksCategory) {
        case 'board_task_category_todo':
            return 'To do'
            break;
        case 'board_task_category_progress':
            return 'In progress'
            break;
        case 'board_task_category_feedback':
            return 'Await feedback'
            break;
        case 'board_task_category_done':
            return 'Done'
            break;
        default:
            console.error('Wrong Category hand over in function board GetStatusCategory()')
            break;
    }
}


/* ******************* Render Functions ******************* */


function boardRenderInit() {
    boardRenderStatusPreview(boardTasksToDo, 'board_task_category_todo');
    boardRenderStatusPreview(boardTasksProgress, 'board_task_category_progress');
    boardRenderStatusPreview(boardTasksFeedback, 'board_task_category_feedback');
    boardRenderStatusPreview(boardTasksDone, 'board_task_category_done');
}


function boardRenderStatusPreview(boardTasksArray, tasksCategory) { /* tasksList*/
    let tasksCategoryDiv = document.getElementById(tasksCategory) /*'board_task_category_todo'*/

    if (boardTasksArray == []) {
        boardRenderTasksPlaceholder(tasksCategory);
    } else {
        boardRenderTasksPreview(boardTasksArray, tasksCategory);
    }
}


function boardRenderTasksPreview(boardTasksArray, tasksCategory) {
    let tasksCategoryDiv = document.getElementById(tasksCategory); /*'board_task_category_todo'*/
    tasksCategoryDiv.innerHTML = '';

    for (let i = 0; i < boardTasksArray.length; i++) {
        const id = boardTasksArray[i];
        let tasksIndex = boardIndexOfTasks(id);
        tasksCategoryDiv.innerHTML += boardRenderTasksPreviewHTML(tasksIndex);
    }
}


function boardRenderTasksPlaceholder(tasksCategory) {
    let tasksCategoryDiv = document.getElementById(tasksCategory); /*'board_task_category_todo'*/
    tasksCategoryDiv.innerHTML = '';
    let tasksCategoryStatus = boardGetNameStatusCategory(tasksCategory);
    tasksCategoryDiv.innerHTML = boardRenderTasksPlaceholderHTML(tasksCategoryStatus);
}


function boardRenderTasksPlaceholderHTML(tasksCategoryStatus) {
    return /* html */`
    <div class="board-no-task-feedback">
        <span class="board-no-task-feedback-text">No tasks ${tasksCategoryStatus}</span>
    </div>
    `;
}


function boardRenderTasksPreviewHTML(tasksIndex) {
    return /* html */`
    <div class="board-task-card-preview">
        <span class="board-task-card-taskcategory">User Story</span>
        <span class="board-task-card-headline">${tasks[tasksIndex]['title']}</span>
        <span class="board-task-card-description">Build start page with recipe
            recommendation...</span>
        <div class="board-task-card-progress-container">
            <div class="board-task-card-progressbar">
                <div class="board-task-card-progress"></div>
            </div>
            <span class="board-task-card-progress-text">1/2 Subtasks</span>
        </div>
        <div class="board-task-card-profile-priority">
            <div class="board-task-card-profile-container">
                <!-- render profile icons -->
                <div class="board-task-card-profile">
                    <img src="./img/board/board_task_profile_ellipse.svg" alt="">
                    <span class="board-task-card-profile-text">TN</span>
                </div>
                <div class="board-task-card-profile" style="left: -8px;">
                    <img src="./img/board/board_task_profile_ellipse.svg" alt="">
                    <span class="board-task-card-profile-text">NT</span>
                </div>
            </div>
            <img class="board-task-card-priority" src="./img/board/board_task_urgent.svg"
                alt="">
        </div>
    </div>
    `;
}


/* ******************* Render Functions - end ******************* */