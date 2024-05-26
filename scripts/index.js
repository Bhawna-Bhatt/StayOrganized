"use strict"

window.onload = function () {

    let userNum = document.getElementById("userNum");
    let todoNum = document.getElementById("todoNum");

    fetch("http://localhost:8083/api/todos/")
    .then(response => response.json())
    .then(data => {
        todoNum.innerText = `Total Tasks :${data.length}`;
    })

    fetch("http://localhost:8083/api/users")
    .then(response => response.json())
    .then(data => {
        userNum.innerText = `Total Users :${data.length}`;
    })

}

function validateUser() {

    
    
    
   console.log("in function")

    let userform = document.getElementById("registerform");

    userform.addEventListener("submit", (e) => {

        e.preventDefault();
        let name = userform.elements["name"];
        let username = userform.elements["username"];
        let password = userform.elements["password"];
        let confirmpassword = userform.elements["confirmpassword"];
        

              
      fetch("http://localhost:8083/api/username_available/" + String(username.value))
        .then(response => response.json())
        .then(data => {

            console.log(data.available) 
            
            if(!data.available) {
                alert('User already exists');
                
                name.value = "";
                username.value ="";
                password.value = "";
                confirmpassword.value ="";
                
                
            } 

            else if(password.value !== confirmpassword.value) {
                console.log("in else if")

                name = "";
                username ="";
                password = "";
                confirmpassword ="";
                

                alert("Password mismatch")

                
            }

            else {
                let numOfUsers = 0;

           fetch("http://localhost:8083/api/users")
            .then(response => response.json())
            .then(data => {

                numOfUsers = data.length;
                console.log(numOfUsers);
            
               
                numOfUsers += 1 ;
                let userData = {
                    "id": numOfUsers,
                    "name": name.value,
                    "username": username.value,
                    "password": password.value,
              }
                console.log(JSON.stringify(userData));
                
                //post 

                fetch("http://localhost:8083/api/users",{
                     method: "POST",
                    body: JSON.stringify(userData),
                    headers: {"Content-type": 
                    "application/json; charset=UTF-8"}
                })
                .then(response =>response.json())
                .then(json => {
                alert("User Added successfully");
            })
            .catch(err => {
                console.log(err)
            })

            
            })
            
            
        }

        
      }) 
    })


    } 


