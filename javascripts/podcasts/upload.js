const username = document.getElementById("username")
const aboutMe = document.getElementById("aboutMe")
const title = document.getElementById("colFormLabelSm")
const description = document.getElementById("exampleFormControlTextarea1")
const script = document.getElementById("exampleFormControlTextarea2")
const tags = document.getElementById("tags")
const btnPublish = document.getElementById("publish")

const url = "http://127.0.0.1:3000/Podcasts"

const getId = localStorage.getItem("user");
const getabout = localStorage.getItem("aboutme")

getUser(getId, getabout)

async function getUser(userid, getaboutme) {
    username.innerHTML = userid
    aboutMe.innerHTML = getaboutme
}
btnPublish.addEventListener("click", postPodcast)

async function postPodcast(){
    const token = sessionStorage.getItem("token")
    const body = {"Title": title.value, "Tags": tags.value, "File": " ", "Description": description.value, "Script": script.value}
    const resp = await fetch( url , {
       method: 'post',
       headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      },
       body: JSON.stringify(body)
     });
    const datos = await resp.json()
    window.location.replace("publicProfile.html")
    return datos
}
