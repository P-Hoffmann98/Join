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
        boardRenderStoryline(`board_task_storyline_${tasksIndex}`, tasksIndex);
        boardRenderImgPrio(tasksIndex);
    }
}


/**
 * Render categoryTask from tasks-json
 * @param {number} tasksIndex 
 */
function boardRenderStoryline(id, tasksIndex) {
    let storyline;
    let cssClass;

    if (tasks[tasksIndex]['categoryTask'] == 1) {
        storyline = 'Technical Task';
        cssClass = 'board-technicaltask-color'
    } else {
        storyline = 'User Story';
        cssClass = 'board-userstory-color'
    }

    document.getElementById(id).innerHTML = storyline;
    document.getElementById(id).classList.add(cssClass);
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
        <div class="board-task-card-detail-storyline d-flex jc-between ai-center">
            <span id="board_task_storyline_detail_${tasksIndex}" class="board-task-card-detail-taskcategory"></span>
            <div class="board-task-card-detail-close d-flex jc-center ai-center" onclick="boardCloseDetailCard()">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="./img/board/board_detail_clos.svg">
                <path d="M6.99999 8.40005L2.09999 13.3C1.91665 13.4834 1.68332 13.575 1.39999 13.575C1.11665 13.575 0.883321 13.4834 0.699988 13.3C0.516654 13.1167 0.424988 12.8834 0.424988 12.6C0.424988 12.3167 0.516654 12.0834 0.699988 11.9L5.59999 7.00005L0.699988 2.10005C0.516654 1.91672 0.424988 1.68338 0.424988 1.40005C0.424988 1.11672 0.516654 0.883382 0.699988 0.700049C0.883321 0.516715 1.11665 0.425049 1.39999 0.425049C1.68332 0.425049 1.91665 0.516715 2.09999 0.700049L6.99999 5.60005L11.9 0.700049C12.0833 0.516715 12.3167 0.425049 12.6 0.425049C12.8833 0.425049 13.1167 0.516715 13.3 0.700049C13.4833 0.883382 13.575 1.11672 13.575 1.40005C13.575 1.68338 13.4833 1.91672 13.3 2.10005L8.39999 7.00005L13.3 11.9C13.4833 12.0834 13.575 12.3167 13.575 12.6C13.575 12.8834 13.4833 13.1167 13.3 13.3C13.1167 13.4834 12.8833 13.575 12.6 13.575C12.3167 13.575 12.0833 13.4834 11.9 13.3L6.99999 8.40005Z" fill="#2A3647"/>
            </svg>
            </div>
        </div>


        <h1 class="board-task-card-detail-headline">${tasks[tasksIndex]['title']}</h1>

        <p class="board-task-card-detail-description">${tasks[tasksIndex]['description']}</p>

        <div class="d-flex ai-center mb-24"><p class="board-task-card-detail-duedate">Due date:</p><p>Datums-Funktion schreiben</p></div>
        <div class="d-flex ai-center mb-24"><p class="board-task-card-detail-priority">Priority:</p><p>Priority-Funktion schreiben</p></div>
        <div class="d-flex flex-d-col mb-24">
            <p class="board-task-card-detail-asignedto mb-8">Assigned To:</p>
            <div class="board-task-card-detail-profile d-flex ai-center">
                <div class="board-task-card-detail-initals">
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="21" cy="21" r="20" fill="#6E52FF" stroke="white" stroke-width="2"/>
                    </svg>
                    <span class="board-task-card-detail-profile-text">TN</span>
                </div>
                <p>Tobias Nölle Funktion schreiben</p>  
            </div>
            <div class="board-task-card-detail-profile d-flex ai-center">
                <div class="board-task-card-detail-initals">
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="21" cy="21" r="20" fill="#6E52FF" stroke="white" stroke-width="2"/>
                    </svg>
                    <span class="board-task-card-detail-profile-text">TN</span>
                </div>
                <p>Tobias Nölle Funktion schreiben</p>  
            </div>
        </div>

    `;

    boardRenderStoryline(`board_task_storyline_detail_${tasksIndex}`, tasksIndex);
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