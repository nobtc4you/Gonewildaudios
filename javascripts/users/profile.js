const username = document.getElementById("username")
const pronouns = document.getElementById("pronouns")
const aboutMe = document.getElementById("aboutMe")
const myAudios= document.getElementById("myAudios")
const btnAboutMe = document.getElementById("btns")
const profilePhoto = document.getElementById("profilePhoto")
const favoritesPlace = document.getElementById("favorites")
// const url = "http://127.0.0.1:3000"
const url = "http://gonewildaudios.com:3000"

const getId = localStorage.getItem("userId");
const idloggedin = sessionStorage.getItem("userLoggedIn")



if(sessionStorage.getItem("userLoggedIn")){
    const signUp = document.getElementById("signUpMenu")
    const logIn = document.getElementById("logInMenu")
    const profile = document.getElementById("profileMenu")

    signUp.className = "none"
    logIn.className = "none"
    profile.className = "nav_text"
}



getUser(getId)
async function getUser (id){
    const resp = await fetch(url+"/User/"+id)
    const datos = await resp.json()
        username.innerHTML = datos[0].User;
        aboutMe.innerHTML = datos[0].About_me
        pronouns.innerHTML = datos[0].Pronouns
/*         profilePhoto.setAttribute("src", "" )AGREGAR FOTO */
    const validate = await validateUser()
    if(validate){
        const bluePrint = document.createElement("a")
            bluePrint.href= "uploadBlueprint.html"
        const btnUpload = document.createElement("button")
            btnUpload.className = "btn btn-primary"
            btnUpload.innerHTML = "UPLOAD"
        const settings = document.createElement("a")
            settings.href ="settings.html"
        const btnSettings = document.createElement("button")
            btnSettings.className = "btn btn-outline-light"
            btnSettings.innerHTML ="SETTINGS"
        bluePrint.appendChild(btnUpload)
        settings.appendChild(btnSettings)
        btnAboutMe.appendChild(bluePrint)
        btnAboutMe.appendChild(settings)
        btnUpload.addEventListener("click", () => {
            localStorage.setItem("user", datos[0].User);
            localStorage.setItem("aboutme", datos[0].About_me);
        })
    }
}
getUserAudios(getId)
async function validateUser(){
    if(getId == idloggedin ){
        return getId
    }else {return false}
}
async function getUserAudios(id){
    const resp = await fetch(url+"/Podcasts/User/"+id)
    const datos = await resp.json()
    const validate = await validateUser()
    console.log(validate)
    if(!validate){
        datos.forEach(audio => {
            const audiosList = document.createElement("div")
                audiosList.className = "songlists"
            const img = document.createElement("img")
                img.className = "songlistsImg"
                img.setAttribute("src","")
                img.setAttribute("width", "100%")
                img.setAttribute("alt", "audio image")
            const audioText = document.createElement("div")
                audioText.className = "song-text"
            const titleAnchor = document.createElement("a")
                titleAnchor.href = "#"
            const title = document.createElement("h4")
                title.className = "item-2"
                title.innerHTML = audio.Title
            const more = document.createElement("i")
                more.className = "material-icons"
                more.innerHTML = "more_horiz"
                titleAnchor.appendChild(title)
            audioText.appendChild(titleAnchor)
            audiosList.appendChild(img)
            audiosList.appendChild(audioText)
            audiosList.appendChild(more)
            myAudios.appendChild(audiosList)

            })
    }else {
        datos.forEach(audio => {
            const audiosList = document.createElement("div")
                audiosList.className = "songlists"
            const img = document.createElement("img")
                img.className = "songlistsImg"
                img.setAttribute("src","")
                img.setAttribute("width", "100%")
                img.setAttribute("alt", "audio image")
            const audioText = document.createElement("div")
                audioText.className = "song-text"
            const titleAnchor = document.createElement("a")
                titleAnchor.href = "#"
            const title = document.createElement("h4")
                title.className = "item-2"
                title.innerHTML = audio.Title
            const spanDelete = document.createElement("span")
                spanDelete.style ="margin-right: 2px"
            const btnDelete = document.createElement("button")
                btnDelete.setAttribute("type", "button")
                btnDelete.className = "btn btn-danger"
                btnDelete.innerHTML = "DELETE"
                btnDelete.addEventListener("click", async () =>{
                    const idAudio = audio.Id
                    const token = sessionStorage.getItem("token")
                    const resp = await fetch(url+"/Podcast/"+ idAudio,{
                        method: 'delete',
                        headers:{
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+token
                        },
                    })
                    const respJson = await resp.json()
                    location.reload()
                })
            titleAnchor.appendChild(title)
            audioText.appendChild(titleAnchor)
            audiosList.appendChild(img)
            audiosList.appendChild(audioText)
            spanDelete.appendChild(btnDelete)
            audiosList.appendChild(spanDelete)
            myAudios.appendChild(audiosList)
        })
        favorites()
    }
}
async function favorites (){
    const urlFavorites = url+"/Favorites"
    const token = sessionStorage.getItem("token")
    const resp = await fetch( urlFavorites, {
       headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
       }})
    const datos = await resp.json();
    datos.forEach(favorite => {
        const audiosList = document.createElement("div")
            audiosList.className = "songlists"
        const img = document.createElement("img")
            img.className = "songlistsImg"
            img.setAttribute("src","")
            img.setAttribute("width", "100%")
            img.setAttribute("alt", "audio image")
        const audioText = document.createElement("div")
            audioText.className = "song-text"
        const titleAnchor = document.createElement("a")
            titleAnchor.href = "#"
        const title = document.createElement("h4")
            title.className = "item-2"
            title.innerHTML = favorite.Title
        const spanDelete = document.createElement("span")
            spanDelete.style ="margin-right: 2px"
        const btnDelete = document.createElement("button")
            btnDelete.setAttribute("type", "button")
            btnDelete.className = "btn btn-danger"
            btnDelete.innerHTML = "DELETE"
        btnDelete.addEventListener("click", async () =>{
            const idFavorite = favorite.Id
            const token = sessionStorage.getItem("token")
            const resp = await fetch(url+"/Favorites/"+ idFavorite,{
                        method: 'delete',
                        headers:{
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+token
                        },
                    })
                    const respJson = await resp.json()
                    location.reload()
        })
            titleAnchor.appendChild(title)
            audioText.appendChild(titleAnchor)
            audiosList.appendChild(img)
            audiosList.appendChild(audioText)
            spanDelete.appendChild(btnDelete)
            audiosList.appendChild(spanDelete)
            favoritesPlace.appendChild(audiosList)
    })
}
