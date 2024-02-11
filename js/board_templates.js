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

        <div id="board_task_preview_subtasks_${tasksIndex}" class="board-task-card-progress-container">
            <!-- <div class="board-task-card-progressbar">
                <div class="board-task-card-progress"></div>
            </div>
            <span class="board-task-card-progress-text">1/2 Subtasks</span> -->
        </div>

        <div class="board-task-card-profile-priority">
            <div id="board_task_preview_initials_${tasksIndex}" class="board-task-card-profile-container">
                <!-- render profile icons -->
            </div>
            <img id="board-task-card-priority_${tasksIndex}" class="board-task-card-priority" src="" alt="">
        </div>
    </div>
    `;
}


/**
 * function return html code to render
 * @param {string} name 
 * @param {string} initials 
 * @param {string} color 
 * @returns 
 */
function boardRenderAssignedToHTML(name, initials, color) {
    return /* html */`
    <div class="board-task-card-detail-profile d-flex ai-center">
        <div class="board-task-card-detail-initals">
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="./img/board/board_ellipse_initials.svg">
                <circle cx="21" cy="21" r="20" fill="${color}" stroke="white" stroke-width="2"/>
            </svg>
            <span class="board-task-card-detail-profile-text">${initials}</span>
        </div>
        <p>${name}</p>  
    </div>
    `;
}


/**
 * function return html code to render
 * @param {string} initials 
 * @param {string} color 
 * @returns 
 */
function boardRenderInitialsHTML(initials, color) {
    return /* html */`
    <div class="board-task-card-profile">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="./img/board/board_ellipse_initials.svg">
            <circle id="Ellipse 5" cx="16" cy="16" r="15.5" fill="${color}" stroke="white"/>
        </svg>
        <span class="board-task-card-profile-text">${initials}</span>
    </div>
    `;
}