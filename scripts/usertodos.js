"use strict"

window.onload = function () {

    let dropdownMenuItems = document.getElementById("mydropdownMenuItems");
    dropdownMenuItems.onclick = dropdownMenuItemsFunction();
    
}

function dropdownMenuItemsFunction() {

    let selectUser = document.getElementById("mydropdownMenuItems")

    fetch("http://localhost:8083/api/users")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        for(let i=0;i<data.length;i++) {
            let element = document.createElement("option");
            element.textContent = data[i].name;
            element.value= data[i].id;
            selectUser.append(element);
        }
    })

}



const selected = document.querySelector(".selected")
selected.addEventListener("change", getoptionDetails);
//console.log(selected.id);

function getoptionDetails() {

    if(selected.value === ""){
        alert("Please select a user.")
    }
    else {
        
    fetch("http://localhost:8083/api/todos/byuser/" + selected.value)
    .then(response => response.json())
    .then(data => {

            let tasktable = document.getElementById("tasktable");
            let rowCount = tasktable.rows.length;
            console.log(rowCount);

            if (rowCount > 1){
                
            for(let j=1; j<rowCount;j++) {
                tasktable.deleteRow(1)
            }
        }
            for(let i=0; i<data.length;i++) {
            let row =   tasktable.insertRow(-1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);

            cell1.innerHTML = data[i].category;
            cell2.innerHTML = data[i].description;
            cell3.innerHTML = data[i].deadline;
            cell4.innerHTML = data[i].priority;
            if (data[i].completed == true) {
            cell5.innerHTML = "✔";}
            else {
                cell5.innerHTML = "✘";
            }
        
    }
})
            
            
 
        
}
}





