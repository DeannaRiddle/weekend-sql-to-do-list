$(document).ready(init);

function init() {
  console.log("JQ");
  $("#js-submit-task").on("submit", submitTask);
}

function submitTask(event) {
  event.preventDefault();
  const taskInput = {
    task: $("#js-input-newTask").val(),
    Date_In: $("#js-input-dateIn").val(),
    Importance: $("#js-input-importance").val(),
  };
  console.log(taskInput);
  postTask(taskInput);
  clearInput();
}
function postTask(task){
  const dataForServer= {
      task : task
  }
  $.ajax({
    method: "Post",
    url: "/tasks",
    data: dataForServer,
  });
}

 function clearInput() {
$("#js-input-newTask").val(""),
$("#js-input-dateIn").val(""),
$("#js-input-importance").val(""),
  
 }