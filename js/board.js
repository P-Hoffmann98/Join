let boardTasksToDo = [];
let boardTasksProgress = [];
let boardTasksFeedback = [];
let boardTasksDone = [];
let boardCurrentDraggedTask;


/**
 * function to initialize the board.html if it will load
 */
async function boardInit() {
    await includeHTML();
    await loadTasks();
    await boardReadTasks();
    boardRenderInit();
}


function boardCleanTaksArrays() {
    boardTasksToDo = [];
    boardTasksProgress = [];
    boardTasksFeedback = [];
    boardTasksDone = [];
}


/**
 * function read tasks from tasks-json and start function boardSortTasks()
 */
async function boardReadTasks() {
    boardCleanTaksArrays();

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


/**
 * Function read index of the id into tasks json
 * @param {number} id 
 * @returns index of tasks array
 */
function boardIndexOfTasks(id) {

    for (let j = 0; j < tasks.length; j++) {
        const task = tasks[j];

        if (task['id'] == id) {
            /* console.log(task['id']);
            console.log(id);
            console.log(j); */
            return j;
        }
    }
}


/**
 * finction return a stirng to render right name into placeholder if no task exist into any task category
 * @param {string} tasksCategory is the id of the category div
 * @returns Name of category as string
 */
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


function boardStartDragging(tasksIndex) {
    boardCurrentDraggedTask = tasksIndex;
}


function allowDrop(ev) {
    ev.preventDefault();
}


async function boardDrop(category) {
    tasks[boardCurrentDraggedTask]['status'] = category;
    await boardReadTasks();
    boardRenderInit();
}


function boardAddBackgroundMoveTask(id) {
    document.getElementById(id).classList.add('board-drop-category-background');
}


function boardRemoveBackgroundMoveTask(id) {
    document.getElementById(id).classList.remove('board-drop-category-background');
}


/* **************************************************************** Render Functions ************************************************************** */


/**
 * function call boardRenderStatusPreview for all categorys of tasks
 */
function boardRenderInit() {
    boardRenderStatusPreview(boardTasksToDo, 'board_task_category_todo');
    boardRenderStatusPreview(boardTasksProgress, 'board_task_category_progress');
    boardRenderStatusPreview(boardTasksFeedback, 'board_task_category_feedback');
    boardRenderStatusPreview(boardTasksDone, 'board_task_category_done');
}


/**
 * function checked if boardTasksArray is empty an call the right render function for placeholder or cards preview
 * @param {Array} boardTasksArray 
 * @param {string} tasksCategory 
 */
function boardRenderStatusPreview(boardTasksArray, tasksCategory) {
    if (boardTasksArray.length == 0) {
        boardRenderTasksPlaceholder(tasksCategory);
    } else {
        boardRenderTasksPreview(boardTasksArray, tasksCategory);
    }
}


/**
 * function render all preview cards of tasks
 * @param {Array} boardTasksArray 
 * @param {string} tasksCategory 
 */
function boardRenderTasksPreview(boardTasksArray, tasksCategory) {
    let tasksCategoryDiv = document.getElementById(tasksCategory);
    tasksCategoryDiv.innerHTML = '';

    for (let i = 0; i < boardTasksArray.length; i++) {
        const id = boardTasksArray[i];
        let tasksIndex = boardIndexOfTasks(id);
        tasksCategoryDiv.innerHTML += boardRenderTasksPreviewHTML(tasksIndex);
    }
}


/**
 * function render placeholder if no tasks exist into category
 * @param {string} tasksCategory 
 */
function boardRenderTasksPlaceholder(tasksCategory) {
    let tasksCategoryDiv = document.getElementById(tasksCategory); /*'board_task_category_todo'*/
    tasksCategoryDiv.innerHTML = '';
    let tasksCategoryStatus = boardGetNameStatusCategory(tasksCategory);
    tasksCategoryDiv.innerHTML = boardRenderTasksPlaceholderHTML(tasksCategoryStatus);
}


/**
 * function return html code to render
 * @param {string} tasksCategoryStatus name of category
 * @returns html code to render placeholder
 */
function boardRenderTasksPlaceholderHTML(tasksCategoryStatus) {
    return /* html */`
    <div class="board-no-task-feedback">
        <span class="board-no-task-feedback-text">No tasks ${tasksCategoryStatus}</span>
    </div>
    `;
}


/**
 * function return html code to render
 * @param {number} tasksIndex index of dataset into tasks array
 * @returns html code to render preview card
 */
function boardRenderTasksPreviewHTML(tasksIndex) {
    return /* html */`
    <div draggable="true" ondragstart="boardStartDragging(${tasksIndex})" class="board-task-card-preview">
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