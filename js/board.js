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


function boardIndexOfTasks(/* array mit den Daten */) {
    
    for (let i = 0; i < boardTasksToDo.length; i++) {

        const id = boardTasksToDo[i];

        for (let j = 0; j < tasks.length; j++) {
            const task = tasks[j];


            if (task['id'] == id) {
                console.log(task['id']);
                console.log(id);
                console.log(j);
                return j;
            }
        }
    }
}
/* ******************* Render Functions ******************* */
function boardRenderTasksPreview(boardTasksToDo, tasksCategory) { /* tasksList*/
    let tasksCategoryDiv = document.getElementById(tasksCategory) /*'board_task_category_todo'*/

}
/* ******************* Render Functions - end ******************* */