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
        boardRenderStoryline(tasksIndex);
        boardRenderImgPrio(tasksIndex);
    }
}


/**
 * Render categoryTask from tasks-json
 * @param {number} tasksIndex 
 */
function boardRenderStoryline(tasksIndex) {
    let storyline;
    let cssClass;

    if (tasks[tasksIndex]['categoryTask'] == 1) {
        storyline = 'Technical Task';
        cssClass = 'board-technicaltask-color'
    } else {
        storyline = 'User Story';
        cssClass = 'board-userstory-color'
    }

    document.getElementById(`board_task_storyline_${tasksIndex}`).innerHTML = storyline;
    document.getElementById(`board_task_storyline_${tasksIndex}`).classList.add(cssClass);
}


function boardRenderImgPrio(tasksIndex) {
    let imgName = tasks[tasksIndex]['prio'];
    document.getElementById(`board-task-card-priority_${tasksIndex}`).src = `./img/board/board_task_${imgName}.svg`;
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


function boardRenderDetailCard(tasksIndex) {
    let tasksCategoryDiv = document.getElementById('board_task_detail_card');
    tasksCategoryDiv.parentElement.classList.remove('d-none');
    tasksCategoryDiv.parentElement.classList.add('d-flex');
    tasksCategoryDiv.innerHTML = '';
    tasksCategoryDiv.innerHTML = /* html */`
        <div>
            <span id="board_task_storyline_${tasksIndex}" class="board-task-card-taskcategory"></span>
        </div>


        <span class="board-task-card-headline">${tasks[tasksIndex]['title']}</span>
        <span class="board-task-card-description board-line-clamp">${tasks[tasksIndex]['description']}</span>
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
            <img id="board-task-card-priority_${tasksIndex}" class="board-task-card-priority" src="" alt="">
        </div>
    `
}


/* ************************************************* return HTML code ********************************************************************************************* */


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
    <div draggable="true" ondragstart="boardStartDragging(${tasksIndex})" onclick="boardRenderDetailCard(${tasksIndex})" class="board-task-card-preview">
        <span id="board_task_storyline_${tasksIndex}" class="board-task-card-taskcategory">User Story</span>
        <span class="board-task-card-headline">${tasks[tasksIndex]['title']}</span>
        <span class="board-task-card-description board-line-clamp">${tasks[tasksIndex]['description']}</span>
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
            <img id="board-task-card-priority_${tasksIndex}" class="board-task-card-priority" src="" alt="">
        </div>
    </div>
    `;
}