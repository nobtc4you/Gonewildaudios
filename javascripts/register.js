const email = document.getElementById("inputEmail4");
const password = document.getElementById ("inputPassword4");
const user = document.getElementById ("inlineFormInputGroup");
const submit = document.getElementById("register");

const url = "http://127.0.0.1:3000/Users"

async function register (e) {
    e.preventDefault()
    const body = {"User": user.value, "Mail": email.value, "Password": password.value, "About_me":" "}
    console.log (JSON.stringify(body))
    const resp = await fetch( url , {
       method: 'post',
       headers:{
        'Content-Type': 'application/json'
      },
       body: JSON.stringify(body)
     });
    const datos = await resp.json()
    console.log(datos)
    return datos
}

submit.addEventListener("click",register)