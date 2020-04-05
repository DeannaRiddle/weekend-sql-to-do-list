console.log("JS");

let taskList = [];
let taskComplete = 0;

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
      Due_Date: $("#dueDate").val(),
    };
    console.log(newTask);
    saveTask(newTask);

    $("#newTask").val(""), $("#dateIn").val(""), $("#dueDate").val("");
  });
}

function getTask() {
  console.log("in getTask");
  $.ajax({
    method: "GET",
    url: "/tasks",
  })
  .then((response) =)
}
