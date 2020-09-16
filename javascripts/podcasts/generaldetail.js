const title = document.getElementById("titlePodcast")
const like = document.getElementById("like")
const username = document.getElementById("username")
const description = document.getElementById("description")
const tags = document.getElementById("tags")
const url = "http://127.0.0.1:3000"

const getId = localStorage.getItem("podcastId");

getpodcast(getId)
async function getpodcast (id){
    const resp = await fetch(url+"/Podcast/"+id)
    const datos = await resp.json()
        title.innerHTML = datos[0].Title;
        username.innerHTML = datos[0].User;
        description.innerHTML = datos[0].Description
    const tagsArray = datos[0].Tags.split(", ")
        tagsArray.forEach (tag => {
            const tagBtn = document.createElement("a")
            tagBtn.className = "tagView"
            tagBtn.innerHTML = "#"+tag
            tagBtn.setAttribute("href", "#")
            tags.appendChild(tagBtn)
        });




    like.addEventListener("click", addFavorite)
    async function addFavorite(){ 
        console.log("probando")
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