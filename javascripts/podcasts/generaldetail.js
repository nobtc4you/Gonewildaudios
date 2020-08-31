const title = document.getElementById("titlePodcast")
const like = document.getElementById("like")
const username = document.getElementById("username")
const description = document.getElementById("description")
const url = "http://127.0.0.1:3000"

getpodcast();
async function getpodcast (){
    console.log("click")
    const resp = await fetch(url+"/Podcast/5")
    const datos = await resp.json()
    console.log(datos)
    title.innerHTML = datos[0].Title;
    username.innerHTML = datos[0].User;
    description.innerHTML = datos[0].Description

    like.addEventListener("click", addFavorite)
    async function addFavorite(){ 
        const token = sessionStorage.getItem("token")
        console.log(token)

        const resp = await fetch( url+"/Favorites/"+ datos[0].Id , {
            method: 'post',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        });
    const jsonResp = await resp.json();
    console.log(jsonResp);
    }

}