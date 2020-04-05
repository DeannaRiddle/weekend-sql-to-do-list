console.log("JS");

let taskList = [];
let taskCompleteId = 0;

$(document).ready(function () {
  console.log("JQ");
  //Create Click Listeners
  setupClickListeners();
  // load existing tasks to DOM
  getTasks();
  $(".viewTasks").on("click", ".js-btn-complete", taskComplete);
});

function setupClickListeners() {
  $("#addNewTask").on("click", function () {
    console.log("in addNewTask on click");

    const newTask = {
      task: $("#newTask").val(),
      Date_In: $("#dateIn").val(),
      Importance: $("#importance").val(),
    };
    console.log(newTask);
    saveTask(newTask);

    $("#newTask").val(""), $("#dateIn").val(""), $("#importance").val("");
  });
}

function getTask() {
  console.log("in getTask");
  //ajax call to server to get tasks
  $.ajax({
    method: "GET",
    url: "/tasks",
  })
    .then((response) => {
      taskList = response;
      render(taskList);
    })
    .catch((error) => {
      console.log("error in task get", err);
    });
} // end getTask

function saveTask(newTask) {
  console.log("in saveTask", newTask);
  $.ajax({
    method: "POST",
    url: "/tasks",
    data: newTask,
  })
    .then((response) => {
      console.log(response);
      getTask();
    })
    .catch((error) => {
      console.log("error in task post", err);
    });
}

function taskReady(event) {
  console.log("in task complete");
  taskReadyId = event.target.dataset.id;
  console.log("id", taskReadyId);
  const $taskReady = $(this).parent().parent();
  const taskReadyTask = $taskReady.children(".js-task").text.trim();
  const taskReadyDateIn = $taskReady.children(".js-dateIn").text.trim();
  const taskReadyImportance = $taskReady.children(".js-importance").text.trim();

  const taskComplete = {
    task: taskReadyTask,
    date_In: taskReadyDateIn,
    importance: taskReadyImportance,
  };
  updateTask(taskCompleteId, taskReady);

  function updateTask(id, taskData) {
    console.log(taskData);
    $.ajax({
      method: "PUT",
      url: `/tasks/${id}`,
      data: taskData,
    })
      .then((response) => {
        console.log(response);
        getTask();
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  function render(taskList) {
    $(".viewTasks").empty();
    for (let tasks of taskList) {
      if (tasks.importance === "L") {
        $(".viewTasks").append(`
      <tr>
      <td class="js-task">${task.task}</td>
      <td class="js-dateIn">${task.dateIn}</td>
      <td class="js-importance">${task.importance}</td>
      <td></td>
      <td><button class="js-btn-delete" data-id${task.id}">Delete</button></td>
      </tr>`);
      } else if (tasks.importance === "H") {
        $(".viewTasks").apend(`
      <tr>
      <td class="js-task">${task.task}</td>
      <td class="js-dateIn">${task.dateIn}</td>
      <td><button class="js-btn-completed" data-id${task.id}">Completed</button></td>
      <td><button class="js-btn-delete" data-id${task.id}">Delete</button></td>
      </tr>`);
      }
    }
  }
}
