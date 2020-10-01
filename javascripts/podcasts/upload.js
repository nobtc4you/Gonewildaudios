import {tags} from "../tags.js"

const username = document.getElementById("username")
const gender = document.getElementById("gender")
const pronouns = document.getElementById("pronouns")
const aboutMe = document.getElementById("aboutMe")


const title = document.getElementById("colFormLabelSm")
const description = document.getElementById("exampleFormControlTextarea1")
const script = document.getElementById("exampleFormControlTextarea2")
const tagsinput = document.getElementById("tags")
const btnPublish = document.getElementById("publish")

// const url = "http://127.0.0.1:3000"
const url = "http://ec2-52-12-39-230.us-west-2.compute.amazonaws.com:3000"

let tagsAdded = []
const totalTags = tagsAdded.toString()

if(sessionStorage.getItem("userLoggedIn")){
  const signUp = document.getElementById("signUpMenu")
  const logIn = document.getElementById("logInMenu")
  const profile = document.getElementById("profileMenu")
  signUp.className = "none"
  logIn.className = "none"
  profile.className = "nav_text"
}
const getId = localStorage.getItem("userId");
getUser(getId)

async function getUser(id) {
  const resp = await fetch(url+"/User/"+id)
  const datos = await resp.json()
  username.innerHTML= datos[0].User
  gender.innerHTML = datos[0].Gender
  pronouns.innerHTML = datos[0].Pronouns
  aboutMe.innerHTML = datos[0].About_me
}

inputTags()

btnPublish.addEventListener("click", postPodcast)

async function postPodcast(){
    const token = sessionStorage.getItem("token")
    const body = {"Title": title.value, "Tags": totalTags, "File": " ", "Description": description.value, "Script": script.value}
    const resp = await fetch( url+"/Podcasts", {
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

 function inputTags(){
  const tagsOption = document.getElementById("tagsOption")
  const tagsArray = tags.tags.slice(",")
  tagsArray.forEach(tagElement =>{
    const option = document.createElement("option")
    option.value= tagElement

    tagsOption.appendChild(option)

  })

  addTag.addEventListener("click",(e)=>{
    e.preventDefault()
        const valueTag = tagsinput.value
        const deleteTag = document.createElement("div")

    if(!tagsAdded.includes(valueTag)){
      const tagsBtns = document.getElementById("tagsBtns")
      const btn = document.createElement("div")
      btn.innerHTML = "# "+ valueTag
      btn.className = "tagView"

        deleteTag.innerHTML = "X"
        btn.appendChild(deleteTag)
        tagsBtns.appendChild(btn)
      tagsAdded.push(valueTag)
    }

    deleteTag.addEventListener("click",()=>{
      tagsAdded = tagsAdded.filter(tagadd => valueTag !== tagadd)
      btn.className = "none"
    })
    console.log(tagsAdded)

  })

}
