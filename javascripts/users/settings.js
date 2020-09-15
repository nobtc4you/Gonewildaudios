const foto = document.getElementById("exampleFormControlFile1")
const password = document.getElementById("inputPassword2")
const aboutMe = document.getElementById("exampleFormControlTextarea1")
const update = document.getElementById("update")

const url = "http://127.0.0.1:3000/Users"

foto.addEventListener("change", () =>{
    
})
/* Aca agregar el valor de la foto */
update.addEventListener("click", async (e) => {
    e.preventDefault()
    const token = sessionStorage.getItem("token")
    const body = {"Password": password.value, "AboutMe": aboutMe.value, "Photo": ""}
    const resp = await fetch( url , {
       method: 'put',
       headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      },
       body: JSON.stringify(body)
     });
     const datos = await resp.json()
})