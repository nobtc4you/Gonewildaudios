const title = document.getElementById("titlePodcast")
const username = document.getElementById("username")
const description = document.getElementById("description")
const tags = document.getElementById("tags")
const heart = document.getElementById("heart")
const script = document.getElementById("script")

// const url = "http://127.0.0.1:3000"
const url = "http://gonewildaudios.com:3000"

if(sessionStorage.getItem("userLoggedIn")){
    const signUp = document.getElementById("signUpMenu")
    const logIn = document.getElementById("logInMenu")
    const profile = document.getElementById("profileMenu")

    signUp.className = "none"
    logIn.className = "none"
    profile.className = "nav_text"
}



const getId = localStorage.getItem("podcastId");

getpodcast(getId)
async function getpodcast (id){
    const resp = await fetch(url+"/Podcast/"+id)
    const datos = await resp.json()
        title.innerHTML = datos[0].Title;
        username.innerHTML = datos[0].User;
        description.innerHTML = datos[0].Description
        script.innerHTML = datos[0].Script
    const tagsArray = datos[0].Tags.split(", ")
        tagsArray.forEach (tag => {
            const tagBtn = document.createElement("a")
            tagBtn.className = "tagView"
            tagBtn.innerHTML = "#"+tag
            tags.appendChild(tagBtn)
            tagBtn.addEventListener("click", ()=>{
                window.location.replace("search.html")
                localStorage.setItem("tag", tag)
            })
        });

        username.addEventListener("click", ()=>{
            window.location.replace("publicProfile.html")
            localStorage.setItem("userId", datos.UserId);
        })


    heart.addEventListener("click", addFavorite)
    async function addFavorite(){
        heart.innerHTML = "❤"
        const token = sessionStorage.getItem("token")
        const resp = await fetch( url+"/Favorites/"+ datos[0].Id , {
            method: 'post',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        });
    const jsonResp = await resp.json();
    }

}

export{getpodcast}
