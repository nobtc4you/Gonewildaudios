const password = document.getElementById("inputPassword2")
const deleteBtn = document.getElementById("delete")
const userId = sessionStorage.getItem("userLoggedIn")
const token = sessionStorage.getItem("token")
const url = "http://127.0.0.1:3000"



deleteBtn.addEventListener("click", async(e)=>{
    e.preventDefault()
    const resp = await fetch(url+"/validate/"+ userId)
    const datos = await resp.json()
    const userPass = datos[0].Password
     if(userPass == password.value){
        const resp = await fetch(url+"/Users", {
            method: 'delete',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
            }
          })
            const respJson = await resp.json()
            sessionStorage.removeItem("userLoggedIn")
          
            window.location.replace("index.html")
    }else {
        alert("Incorrect password.")
    } 



})
