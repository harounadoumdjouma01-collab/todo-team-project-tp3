function addTask(){

let input=document.getElementById("taskInput");

let li=document.createElement("li");

li.innerHTML=input.value+
' <button onclick="this.parentElement.remove()">Supprimer</button>';

document.getElementById("taskList").appendChild(li);

input.value="";
}