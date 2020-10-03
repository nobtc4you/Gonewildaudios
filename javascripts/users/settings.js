const foto = document.getElementById("exampleFormControlFile1")
const password = document.getElementById("inputPassword2")
const aboutMe = document.getElementById("exampleFormControlTextarea1")
const update = document.getElementById("update")
const gender = document.getElementById("inputCity")
const pronouns = document.getElementById("inputState")
const deleteBtn = document.getElementById("deleteAccount")


// const url = "http://127.0.0.1:3000"
const url = "http://gonewildaudios.com:3000"

getUsersDetails()

  if(sessionStorage.getItem("userLoggedIn")) {
      const signUp = document.getElementById("signUpMenu")
      const logIn = document.getElementById("logInMenu")
      const profile = document.getElementById("profileMenu")

      signUp.className = "none"
      logIn.className = "none"
      profile.className = "nav_text"
  }

async function getUsersDetails(){
  const getId = localStorage.getItem("userId");
  const resp = await fetch(url+"/user/"+getId)
  const datos = await resp.json()
    if(datos[0].Gender){
         gender.value = datos[0].Gender
    }
    if(datos[0].Pronouns){
        pronouns.value = datos[0].Pronouns
    }
    if(datos[0].About_me){
      aboutMe.value = datos[0].About_me
    }
    password.value = datos[0].Password

}

/* Aca agregar el valor de la foto */
update.addEventListener("click", async (e) => {
    e.preventDefault()

    const token = sessionStorage.getItem("token")
    const body = {"Password": password.value, "AboutMe": aboutMe.value, "Photo": "", "Gender":gender.value ,"Pronouns": pronouns.value}
    const JsonBody = JSON.stringify(body)
    const resp = await fetch( url+"/Users" , {
       method: 'put',
       headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      },
       body: JSON.stringify(JsonBody),
     });
     const datos = await resp.json() ;
     window.location.replace("publicProfile.html")
})

async function validateUser(){
  const token = sessionStorage.getItem("token")
  const data = {"id": getId}
  const resp = await fetch(url+"/validate",{
      method: 'post',
      headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
      },
      body: JSON.stringify(data)
  })
  const respJson = await resp.json()
  if(respJson.error){
      return "false"
  }else{ return respJson }

}
deleteBtn.addEventListener("click",async ()=>{
  window.location.replace("confirmationaccountdeletion.html")
})
