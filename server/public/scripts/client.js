$(document).ready(init);

function init() {
  console.log("JQ");
  $("#js-submit-task").on("submit", submitTask);
  $(".js-btn-delete").on("click", deleteTask);
  $(".js-btn-completed").on("click", render);
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
      task: task,
  };
  $.ajax({
    method: "Post",
    url: "/tasks",
    data: dataForServer,
  })
  .then(response => {
    getTask();
  })
  .catch(err => {
    console.warn(err);
  });
}
function getTask() {
  //ajax call to server to get tasks
  $.ajax({
    method: "GET",
    url: "/tasks",
  })
    .then(response => {
      tasks = response;
      renderTask();
    })
    .catch((error) => {
      console.warn(err);
    });
} // end getTask

function deleteTask() {
  const taskId = $(this)
  .parent()
  .data("id");

  $.ajax({
    method: "DELETE",
    url: `/tasks/${taskId}`,
  })
  .then(response => {
    getTask();
  })
  .catch(err => {
    console.warn(err);
  });
}

 function updateTask() {  
   const complete = {
     complete: $(this)
     .parent ()
     .data("id");

    $.ajax({
      method: "PUT",
      url: `/tasks/${taskId}`,
      data: complete,
    })
      .then((response) => {
        getTask();
      })
      .catch((err) => {
        console.warn(err);
      });
  }
  function clearInput() {
    $("#js-input-newTask").val(""),
    $("#js-input-dateIn").val(""),
    $("#js-input-importance").val(""),
    }

    function renderTask(taskList) {
      $(".viewTasks").empty();
      for (let task of task) {
        if (task.importance === "L") {
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
  