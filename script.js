const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

const clearAllBtn = document.getElementById("clearAll");
const search = document.getElementById("search");
const filter = document.getElementById("filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Display Tasks
function renderTasks(){
    taskList.innerHTML="";

    let filteredTasks = tasks.filter(task=>{
        let searchText = task.text.toLowerCase().includes(
            search.value.toLowerCase()
        );
        let filterTask = filter.value==="all" || 
        (filter.value==="completed" && task.completed) ||
        (filter.value==="pending" && !task.completed);


        return searchText && filterTask;

    });
    filteredTasks.forEach((task,index) => {
        let li=document.createElement("li");
        if(task.completed){
            li.classList.add("completed");
        }
        li.innerHTML=`<span>${task.text}</span>
        <div>
            <button class="edit" onclick="editTask(${index})">Edit</button>
            <button class="toggleTask" onclick="toggleTask(${index})">✔</button>
            <button class="delete" onclick="deleteTask(${index})">X</button>
        </div>
        `;
        taskList.appendChild(li);
        
    });
    updateCount();
}

// Add Task
addTaskBtn.addEventListener("click",()=>{

    let text = taskInput.value.trim();

    if(text===""){
        alert("Please enter a task");
        return;
    }
    tasks.push({
        text:text,
        completed:false
    });
    saveTasks();
    renderTasks();

    taskInput.value="";

});


// Complete Task

function toggleTask(index){

    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}


// Delete Task
function deleteTask(index){
    tasks.splice(index,1);
    saveTasks();
    renderTasks();
}


// Edit Task
function editTask(index){

    let newText = prompt("Edit your task",tasks[index].text);
    if(newText){
        tasks[index].text=newText;
        saveTasks();
        renderTasks();
    }
}

// Clear all
clearAllBtn.addEventListener("click",()=>{

    tasks=[];
    saveTasks();
    renderTasks();
});

// Local Storage

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

// Search
search.addEventListener(
    "input",
    renderTasks
);


// Filter
filter.addEventListener(
    "change",
    renderTasks
);


// Count

function updateCount(){
    let completed = tasks.filter(
        task=>task.completed
    ).length;

    let pending = 
    tasks.filter(
        task=>!task.completed
    ).length;


    document.getElementById(
        "completedCount"
    ).innerText=completed;


    document.getElementById(
        "pendingCount"
    ).innerText=pending;




}
renderTasks();

