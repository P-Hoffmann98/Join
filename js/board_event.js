let boardInput = document.getElementById('board_input_search_field');

boardInput.addEventListener('search', boardRenderInit);

boardInput.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // load function if true
      readInputSearch()
    }
  });

  
document.addEventListener("DOMContentLoaded", function () {
  editSelectUserBox = document.getElementById("edit_task_select_user_box");
  editTaskInput = document.getElementById("edit_task_assigned_to");
  editTaskInput.addEventListener("click", editTaskhandleOpenContextMenu);

  editSelectUserBox.addEventListener("click", function (event) {
    event.stopPropagation();
  });
});


document.addEventListener("DOMContentLoaded", function () {
  /**
   * This function is executed when the enter key is pressed while the focus is on the input field with the id edit_task_subtask
   * then the function add subtask is executed
   * @param {keypress} event
   */
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      editTaskAddSubtask();
    }
  }

  let subtaskInput = document.getElementById("edit_task_subtask");
  if (subtaskInput) {
    subtaskInput.addEventListener("keypress", handleKeyPress);
  } else {
    console.error(
      "Element mit der ID 'edit_task_subtask' wurde nicht gefunden."
    );
  }
});