
const input = document.getElementById("searchInput")
const placeAudios = document.getElementById("placeAudios")
// const url = "http://127.0.0.1:3000"
const url = "http://ec2-52-12-39-230.us-west-2.compute.amazonaws.com:3000"

if(sessionStorage.getItem("userLoggedIn")){
    const signUp = document.getElementById("signUpMenu")
    const logIn = document.getElementById("logInMenu")
    const profile = document.getElementById("profileMenu")

    signUp.className = "none"
    logIn.className = "none"
    profile.className = "nav_text"
}

input.addEventListener("keyup", ()=>{
    const inputvalue = input.value
    if(inputvalue.length >= 3 ){
        audiosEncontrados()
        placeAudios.innerHTML =""
    }
})
input.value = localStorage.getItem("tag")
audiosEncontrados()


async function audiosEncontrados(){
        const resp = await fetch(url + "/Podcasts/byTag/"+ input.value)
        const datos = await resp.json()
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
            placeAudios.appendChild(divAudioList)
            divAudioList.addEventListener("click", ()=>{

                localStorage.setItem("podcastId", datos.Id);

            })
            user.addEventListener("click", ()=>{

                localStorage.setItem("userId", datos.UserId);

            })
        })
    }
