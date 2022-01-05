const input = document.querySelector(".input");
const btnAddTask = document.querySelector("#add-task");
const ul = document.querySelector(".collection");
const clearTask = document.querySelector(".clear");

document.addEventListener('DOMContentLoaded', getTasks);

btnAddTask.addEventListener("click", addTask);

ul.addEventListener("click", deleteTask);

clearTask.addEventListener("click", clearTasks);

function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task){
      
      const li = document.createElement('li');
      const i = document.createElement("i");
      
      li.className = 'task';
      li.appendChild(document.createTextNode(task));
      const link = document.createElement('a');

      i.className = "fa fa-remove";
      li.className = "task";

      li.appendChild(link);
      ul.appendChild(li);
    });
  }

function addTask(e)
{
    if(input.value == "")
    {
        alert("Add a Task!");
    }
    else
    {
        const li = document.createElement("li");
        const i = document.createElement("i");

        i.className = "fa fa-remove";
        li.className = "task";

        li.appendChild(document.createTextNode(input.value));
        li.appendChild(i);
        ul.appendChild(li);

        storeTaskInLocalStorage(input.value);

        input.value = "";
    }
}

function deleteTask(e)
{
    if(e.target.classList.contains("fa-remove"))
    {
        if(confirm("Are you sure?"))
        {
            e.target.parentElement.remove();

            removeTaskFromLocalStorage(e.target.parentElement);
        }
    }
}

function clearTasks()
{
    if(confirm("Are you sure?"))
    {
        ul.innerHTML= "";

        clearTasksFromLocalStorage();
    }
    
}

function storeTaskInLocalStorage(task) 
{
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.push(task);
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskItem) 
{
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
        tasks.splice(index, 1);
      }
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasksFromLocalStorage() 
{
    localStorage.clear();
}