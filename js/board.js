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
    loadInitials();
    await loadTasks();
    await loadContacts();
    await boardReadTasks();
    boardRenderInit();
}


/**
 * clean all data in the sort arrays
 */
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
function boardIndexOfJSON(json, id) {
    
    for (let j = 0; j < json.length; j++) {
        const jsonRecord = json[j];

        if (jsonRecord['id'] == id) {
            /* console.log(task['id']);
            console.log(id);
            console.log(j); */
            return j;
        }
    }
}


/**
 * function return a stirng to render right name into placeholder if no task exist into any task category
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


/**
 * store the index in variable boardCurrentDraggedTask if card will clicked an hold
 * @param {number} tasksIndex is a number of Index into the tasks array
 */
function boardStartDragging(tasksIndex) {
    boardCurrentDraggedTask = tasksIndex;
}


/**
 * 
 * @param {Event} ev 
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * function change the status of the task to the droped category status (todo, progress, feedback or done) and call the render functions
 * @param {string} category 
 */
async function boardDrop(category) {
    tasks[boardCurrentDraggedTask]['status'] = category;
    await setItem('tasks', tasks);
    await boardReadTasks();
    boardRenderInit();
}


/**
 * set background-color to a div with called id
 * @param {string} id is a container id
 */
function boardAddBackgroundMoveTask(id) {
    document.getElementById(id).classList.add('board-drop-category-background');
}


/**
 * remove background-color to a div with called id
 * @param {string} id is a container id
 */
function boardRemoveBackgroundMoveTask(id) {
    document.getElementById(id).classList.remove('board-drop-category-background');
}


/**
 * Function set css classes to close detail card of selcted task
 */
function boardCloseDetailCard() {
    let tasksCategoryDiv = document.getElementById('board_task_detail_card');
    tasksCategoryDiv.parentElement.classList.add('d-none');
    tasksCategoryDiv.parentElement.classList.remove('d-flex');
}