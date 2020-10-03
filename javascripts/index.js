import {tags} from "./tags.js"

const topTags = document.getElementById("toptags")


let arrayTag = []
let i = 0

while (i < 9) {
    const n = Math.floor(Math.random() * 10)
    const random = tags.tags[n]
    if(!arrayTag.includes(random) ) {
        arrayTag.push(random);
        i++
    }
}
const idLoggedIn = sessionStorage.getItem("userLoggedIn")
if(idLoggedIn){
    const signUp = document.getElementById("signUpMenu")
    const logIn = document.getElementById("logInMenu")
    const profile = document.getElementById("profileMenu")
    profile.addEventListener("click",()=>{localStorage.setItem("userId", idLoggedIn)})

    signUp.className = "none"
    logIn.className = "none"
    profile.className = "nav_text"
}

arrayTag.forEach(tag => {
    const button = document.createElement("a")
    button.className = "tagView"
    button.setAttribute("src", "#")
    button.innerHTML = "# "+ tag
    topTags.appendChild(button)
    button.addEventListener("click", ()=>{
        window.location.replace("search.html")
        localStorage.setItem("tag", tag)
    })

})

//--- FOR ladies --- //

const forHer = document.getElementById("forHer")
// const url = "http://127.0.0.1:3000"
const url = "http://gonewildaudios.com:3000"

audiosForHer()

async function audiosForHer(){
    const resp = await fetch(url+"/Podcasts/all?limit=3")
    const datos = await resp.json()
     datos.forEach (datos => {
        const divAudioList = document.createElement("a")
            divAudioList.className = "songlists"
        const songImg = document.createElement("img")
            songImg.className = "songlistsImg"
            songImg.src = datos.img||""
            songImg.setAttribute("width", "100%")
        const songText = document.createElement("div")
            songText.className = "song-text"
        const title = document.createElement("a")
            title.setAttribute("href", "generaldetail.html")
        const titleText = document.createElement("h4")
            titleText.className = "item-2"
            titleText.innerHTML = datos.Title
        const user = document.createElement("a")
            user.setAttribute("href", "publicProfile.html")
        const userText = document.createElement("h4")
            userText.className = "item-2"
            userText.innerHTML = datos.User
        const allTagsArray = datos.Tags.split(",")
        const tagsArray = allTagsArray.slice(0,3)
        const spaceBtnTags = document.createElement("div")
        tagsArray.forEach(tag => {
            const tagBtn = document.createElement("a")
                tagBtn.className = "tagView"
                tagBtn.innerHTML = "# "+tag
                spaceBtnTags.appendChild(tagBtn)
                tagBtn.addEventListener("click", ()=>{
                    localStorage.setItem("tag", tag)
                    window.location.replace("search.html")
                })
            })
        const more = document.createElement("i")
            more.className = "material-icons"
            more.innerHTML = "more_horiz"

        title.appendChild(titleText)
        user.appendChild(userText)
        songText.appendChild(title)
        songText.appendChild(user)
        songText.appendChild(spaceBtnTags)
        divAudioList.appendChild(songImg)
        divAudioList.appendChild(songText)
        divAudioList.appendChild(more)
        forHer.appendChild(divAudioList)
        divAudioList.addEventListener("click", ()=>{

            localStorage.setItem("podcastId", datos.Id);

        })
        user.addEventListener("click", ()=>{

            localStorage.setItem("userId", datos.UserId);

        })
    })
}
