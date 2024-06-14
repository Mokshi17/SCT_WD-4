const inputBox= document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask()
{
    if(inputBox.value ==''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");

        let checkboxSpan = document.createElement("span");
        checkboxSpan.className = "checkbox";

        let taskTextSpan = document.createElement("span");
        taskTextSpan.className = "task-text";
        taskTextSpan.textContent = inputBox.value;

        let date = new Date();
        let dateTimeSpan = document.createElement("span");
        dateTimeSpan.className = "task-date-time";
        dateTimeSpan.textContent = date.toLocaleString();
        
        let actionsDiv = document.createElement("div");
        actionsDiv.className = "actions";

       actionsDiv.innerHTML = `
        <span class="edit" onclick="editTask(this)">Edit</span>
        <span class="delete" onclick="deleteTask(this)">&times;</span>`;
        
        li.appendChild(checkboxSpan);
        li.appendChild(taskTextSpan);
        li.appendChild(dateTimeSpan);
        li.appendChild(actionsDiv);

        listContainer.appendChild(li);
        
        checkboxSpan.addEventListener('click',()=>{
            li.classList.toggle('checked');
            saveData();
        });
        saveData();
    }
    inputBox.value= "";

}

function clearTask(){
    localStorage.removeItem("data");
    listContainer.innerHTML="";
    showTask();
}

function editTask(button){
    let li = button.closest("li");
    let currentText = li.querySelector(".task-text").textContent.trim();
    let input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
  
    li.innerHTML ="";
    li.appendChild(input);

    input.addEventListener('blur', () =>{

        let checkboxSpan = document.createElement("span");
        checkboxSpan.className = "checkbox";

        let taskTextSpan = document.createElement("span");
        taskTextSpan.className = "task-text";
        taskTextSpan.textContent = input.value;
        
        let date = new Date();
        let dateTimeSpan = document.createElement("span");
        dateTimeSpan.className = "task-date-time";
        dateTimeSpan.textContent = date.toLocaleString();

        let actionsDiv = document.createElement("div");
        actionsDiv.className = "actions";
        actionsDiv.innerHTML = `
         <span class="edit" onclick="editTask(this)">Edit</span>
         <span class="delete" onclick="deleteTask(this)">&times;</span>`;
   
   li.innerHTML ="";
   li.appendChild(checkboxSpan);
   li.appendChild(taskTextSpan);
   li.appendChild(dateTimeSpan);
   li.appendChild(actionsDiv);
   
   checkboxSpan.addEventListener('click',()=>{
    li.classList.toggle('checked');
    saveData();
});
        saveData();
 });

 input.addEventListener('keydown', (event) =>{
    if (event.key === 'Enter'){
        input.blur();
    }
 });

 input.focus();
}

function deleteTask(button){
    let li = button.closest("li");
    li.remove();
    saveData();
}

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
listContainer.innerHTML = localStorage.getItem("data") || "";

const editButtons= document.querySelectorAll(".edit");
editButtons.forEach(button => button.addEventListener('click', () => editTask(button)));

const deleteButtons = listContainer.querySelectorAll(".delete");
deleteButtons.forEach(button=> button.addEventListener('click',()=>deleteTask(button)));

const checkboxSpans = listContainer.querySelectorAll(".checkbox");
checkboxSpans.forEach(span => span.addEventListener('click', ()=>{
    let li = span.closest("li");
    li.classList.toggle("checked");
    saveData();

}));

}
showTask();
