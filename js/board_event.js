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