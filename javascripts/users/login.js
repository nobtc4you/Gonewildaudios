const email = document.getElementById("exampleInputEmail1");
const password = document.getElementById ("exampleInputPassword1");
const url = "http://127.0.0.1:3000/Users/login"
const submit = document.getElementById("login");

async function login (e) {
    e.preventDefault()
    const userInput = email.value.toLowerCase();
    const passwordInput = password.value
    const body = {"User": userInput, "Password": passwordInput}
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
    sessionStorage.setItem('token', datos.token)
    return datos
}
submit.addEventListener("click",login)

