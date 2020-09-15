const email = document.getElementById("inputEmail4");
const password = document.getElementById ("inputPassword4");
const user = document.getElementById ("inlineFormInputGroup");
const submit = document.getElementById("register");

const url = "http://127.0.0.1:3000/Users"

async function register (e) {
    e.preventDefault()
    const userInput = user.value.toLowerCase()
    const emailInput = email.value.toLowerCase()
    const body = {"User": userInput, "Mail": emailInput, "Password": password.value, "About_me":" "}
    const resp = await fetch( url , {
       method: 'post',
       headers:{
        'Content-Type': 'application/json'
      },
       body: JSON.stringify(body)
     });
    const datos = await resp.json()
    return datos
}
async function checkUser (){
  const userInput = user.value.toLowerCase() 
  const resp = await fetch (`${url}/${userInput}`);
  const datos = await resp.json();
  document.getElementById('usernameInfo').innerHTML = datos
}
async function checkMail (){
  const emailInput = email.value.toLowerCase()
  const resp = await fetch (`${url}/user/${emailInput}`);
  const datos = await resp.json();
  document.getElementById('emailInfo').innerHTML = datos;
}
submit.addEventListener("click",register)
user.addEventListener("change",checkUser)
email.addEventListener("change",checkMail)