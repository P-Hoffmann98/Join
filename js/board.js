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
}


/**
 * function read tasks from tasks-json and start function boardSortTasks()
 */
function boardReadTasks() {
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


/* ******************* Render Functions - end ******************* */