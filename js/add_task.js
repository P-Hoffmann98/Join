function addTaskInit() {
  addTaskSetPrioMedium();
}

function addTaskSetPrioMedium() {
  let prioMedium = document.getElementById("add_task_prio_medium");
  prioMedium.classList.add("add-task-prio-medium-pressed-button");
  let prioMediumImg = document.getElementById("add_task_img_prio_medium");
  prioMediumImg.src = "./img/add-task-prio-medium.svg";
}
