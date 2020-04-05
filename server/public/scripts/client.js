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
  });
}
