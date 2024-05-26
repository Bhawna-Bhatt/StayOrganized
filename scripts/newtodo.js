"use strict"

window.onload = function () {

let categorylist = document.getElementById("categorylist");
let userlist = document.getElementById("userlist");
let f = document.getElementById("taskform");



fetch("http://localhost:8083/api/users")
.then(response => response.json())
.then(data => {
        for(let i=0;i<data.length;i++){
            let user = document.createElement("option");
            user.text = data[i].name;
            user.value = data[i].id;
            userlist.appendChild(user);
        }
    console.log(data)


})

fetch("http://localhost:8083/api/categories")
.then(response => response.json())
.then(data => {
        for(let i =0; i<data.length;i++) {
        let cat = document.createElement("option");
        cat.value = data[i].name;
        categorylist.appendChild(cat);

    }
})


}



let taskform = document.getElementById("taskform");

taskform.addEventListener("submit", function(e) {
    e.preventDefault();
    
    let bodyData = {
    
        "userid": taskform.elements["userid"].value,
        "category": taskform.elements["category"].value,
        "description": taskform.elements["description"].value,
        "deadline": taskform.elements["deadline"].value,
        "priority": taskform.elements["priority"].value,
         
    }

    console.log("a" + JSON.stringify(bodyData));

    //Post data

    fetch("http://localhost:8083/api/todos",{
    method: "POST",
    body: JSON.stringify(bodyData),
    headers: {"Content-type": 
              "application/json; charset=UTF-8"}
  })
.then(response =>response.json())
.then(data => {
    alert("Task Added successfully");
})

    
})

/*




fetch("http://localhost:8083/api/todos",{
    method: "POST",
    body: JSON.stringify(bodyData),
    headers: {"Content-type": 
              "application/json; charset=UTF-8"}
  })
.then(response =>response.json())
.then(data => {
    alert("Task Added successfully");
})
*/
