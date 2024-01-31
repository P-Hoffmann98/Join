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
            boardTasksToDo.push(id);
            break;
        case 'feedback':
            boardTasksToDo.push(id);
            break;
        case 'done':
            boardTasksToDo.push(id);
            break;
        default:
            console.warn = "Wrong status in tasksArray";
    }
}