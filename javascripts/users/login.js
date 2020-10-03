const email = document.getElementById("exampleInputEmail1");
const password = document.getElementById ("exampleInputPassword1");
// const url = "http://127.0.0.1:3000/Users/login"
const url = "http://gonewildaudios.com:3000/Users/login"
const submit = document.getElementById("login");

async function login (e) {
    e.preventDefault()
    const userInput = email.value.toLowerCase();
    const passwordInput = password.value
    const body = {"User": userInput, "Password": passwordInput}
    const resp = await fetch( url , {
       method: 'post',
       headers:{
        'Content-Type': 'application/json'
      },
       body: JSON.stringify(body)
     });
    const datos = await resp.json()
    if(datos.token){
      sessionStorage.setItem('token', datos.token)
      sessionStorage.setItem('userLoggedIn', datos.user.Id)
      window.location.replace("index.html")
    }else{ alert("Usuario o contraseña incorrectos")}


}
submit.addEventListener("click",login)
