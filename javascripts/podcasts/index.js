import {tags} from "../tags.js"
import {getpodcast} from "./generaldetail.js"
console.log(tags)

const topTags = document.getElementById("toptags")

let arrayTag = []
let i = 0

while (i < 9) {
    const n = Math.floor(Math.random() * 10)
    const random = tags[n]
    if(!arrayTag.includes(random) ) {
        arrayTag.push(random);
        i++
    }

}

arrayTag.forEach(tag => {
    const button = document.createElement("a")
    button.className = "tagView"
    button.setAttribute("src", "#")
    button.innerHTML = "# "+ tag
    topTags.appendChild(button)

})

//--- FOR ladies --- //

const forHer = document.getElementById("forHer")
const url = "http://127.0.0.1:3000"

audiosForHer()

async function audiosForHer(){
    const resp = await fetch(url+"/Podcasts?limit=3")
    const datos = await resp.json()
    console.log(datos)
    datos.forEach (datos => {        
        const divAudioList = document.createElement("a")
            divAudioList.setAttribute("href", "generaldetail.html")
            divAudioList.className = "songlists"
        const songImg = document.createElement("img")
            songImg.className = "songlistsImg"
            songImg.src = datos.img||""
            songImg.setAttribute("width", "100%")
        const songText = document.createElement("div")
            songText.className = "song-text"
        const title = document.createElement("a")  
        const titleText = document.createElement("h4")
            titleText.className = "item-2"
            titleText.innerHTML = datos.Title
        const user = document.createElement("a") 
            user.setAttribute("href", "publicProfile.html")
        const userText = document.createElement("h4")
            userText.className = "item-2"  
            userText.innerHTML = datos.User
        const more = document.createElement("i")
            more.className = "material-icons"
            more.innerHTML = "more_horiz"

        title.appendChild(titleText)
        user.appendChild(userText)
        songText.appendChild(title)
        songText.appendChild(user)
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
