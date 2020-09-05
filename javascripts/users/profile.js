const username = document.getElementById("username")
const pronouns = document.getElementById("pronouns")
const aboutMe = document.getElementById("aboutMe")
const url = "http://127.0.0.1:3000"

const getId = localStorage.getItem("userId");

getUser(getId)
async function getUser (id){
    const resp = await fetch(url+"/User/"+id)
    const datos = await resp.json()
        username.innerHTML = datos[0].User;
        aboutMe.innerHTML = datos[0].About_me
}
