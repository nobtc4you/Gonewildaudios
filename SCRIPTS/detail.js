let queryString = location.search;
let datos = new URLSearchParams(queryString);
let idGeneral = datos.get('id');//Nos permite obtener el id de la url
let type = datos.get('type'); 
console.log(type);

let spinner = document.getElementById("spinner");
let searchShadow = document.getElementById("searchShadow");

    function showSpinner() {
         spinner.className = "show";
         searchShadow.className = "show";
    }

    function hideSpinner() {
        spinner.className = spinner.className.replace("show", "");
        searchShadow.className = searchShadow.className.replace("show", "");
    }

let proxy = "https://cors-anywhere.herokuapp.com/";
let urlGeneral = proxy + 'https://api.deezer.com/' + type + '/' + idGeneral; //La ruta tiene cors, los datos de deezer y el id, cambio el path al de 1 track

if(type == 'track'){
    showSpinner();
fetch(urlGeneral)
    .then(function(response){
        return response.json();
    })
    .then(function(datos){

        console.log(datos); //Me va a dar los datos de 1 cancion
        //Teng que capturar titulo, interprete, y album
        let image = document.querySelector(".image-detalle");
        image.innerHTML += '<img src="' + datos.album.cover_big + '">';
        
        let titulo = document.querySelector('.titulo-detalle');
        titulo.innerHTML += datos.title;

        let interprete = document.querySelector('.subtitulo1');
        interprete.innerHTML += '<h3> <span style="color:#7acfe8;">ARTISTA: </span>' + '<a href ="generaldetail.html?id=' + datos.artist.id  + '&type=artist">'+ datos.artist.name +'</a></h3>';

        let album = document.querySelector('.subtitulo2');
        album.innerHTML += '<span style="color:#7acfe8;">ÁLBUM: </span>' + '<a href ="generaldetail.html?id=' + datos.album.id  +'&type=album">'+ datos.album.title +'</a>';

        //Agregamos el player
        let player = document.querySelector('.widget-player');
        player.style = 'padding: 20px 0px;'
        player.innerHTML += '<iframe scrolling="no" frameborder="0" allowTransparency="true" class="playerWidget" src="https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=600&height=92&color=7acfe8&layout=dark&size=medium&type=tracks&id=' + idGeneral + '&app_id=1" width="80%" height="92"></iframe>';
        
        let theh3 = document.querySelector('.subtitulo2');
        theh3.style = 'display:block;';

        let addButtons = document.querySelector('.add-buttons');
        addButtons.style = 'display:block;';
        hideSpinner();
    })
    .catch(function(error) {
        console.log(error);
    })




    //pasos para agregar temas a una playlist


    //Paso 1
    let recuperoStorage = localStorage.getItem('playlist');
    console.log(recuperoStorage);
    
    //Si todavia no tengo tracks en mi playlist
    if(recuperoStorage == null){
        //Creo una lista vacia
        playlist = [];
    } else {
        //Recupero el aray de localStorage
        playlist = JSON.parse(recuperoStorage) //Transformo los datos en un elemento operable
    }

    //me fijo que no este en la lista y cambio el texto del boton
    if(playlist.includes(idGeneral)){ //Hay que agregar el id del track
        document.querySelector('.agregar').innerHTML = "Quitar de la playlist"; 
    }


    //Paso 2: agregar un track a la playlist
    let agregar = document.querySelector('.agregar');
    console.log(agregar);
    
    agregar.addEventListener('click', function(e){
        //detener el a
        e.preventDefault();

        if (playlist.includes(idGeneral)) {
            //Si el track esta, tenemos que quitarlo. Tenemos que encontar el track dentro del array
            let indiceEnElArray = playlist.indexOf(idGeneral);
            playlist.splice(indiceEnElArray, 1);
            document.querySelector('.agregar').innerHTML = "Agregar a playlist";
            console.log(playlist);
            
        } else {
            playlist.push(idGeneral);
            document.querySelector('.agregar').innerHTML = "Quitar de la playlist";
            }

        /*
        //Quiero agregarle el id de track, push me permite agregarle elementos
        playlist.push(idGeneral);
        document.querySelector('.agregar').innerHTML = "Quitar de la playlist"; //Le estoy cambiando la vista al usuario
        */
        
        //Paso 3 guardar lista en local Storage
        let playlistParaStorage = JSON.stringify(playlist);
        localStorage.setItem('playlist', playlistParaStorage);
        console.log(localStorage);  
    })

}


if(type == 'artist'){
    showSpinner();
    fetch(urlGeneral)
        .then(function(response){
            return response.json();
            
        })
        .then(function(datos){
            console.log(datos); //Me va a dar los datos de 1 cancion
            
            let image = document.querySelector(".image-detalle");
            image.innerHTML += '<img src="' + datos.picture_big + '">';

            let followers  = document.querySelector('.social_followers');
            followers.innerHTML += '<p class="followers"><span style="color:#e674e0;">&#10084;</span>'+ datos.nb_fan +'</p>'

            let titulo = document.querySelector('.titulo-detalle');
            titulo.innerHTML += datos.name;
            
            let someSongs = document.querySelector('.subtitulo1');
            someSongs.innerHTML += '<h4 style="padding: 10px;"><span style="color:#7acfe8;">TOP TRACKS</span></h4>';

            let theh3 = document.querySelector('.subtitulo2');
            theh3.style = 'display:none;'


            let topArtist = proxy + datos.tracklist; //LINKEO CON EL TRACKLIST
            fetch(topArtist)
                .then(function(response){
                    return response.json();
                    
                })
                .then(function(datos){
                    console.log(datos);
                    let unorderedList = document.querySelector('.widget-player')
                    unorderedList.innerHTML += '<section class="scroll-box-at"><ul class="lista"></ul></section>';
                    let lista = document.querySelector('.lista');
                    let artistSongs = datos.data;
                    let theSong = '';
                    for (let i = 0; i < 20; i++) {
                        theSong += '<li class="detail-margins"><a href="generaldetail.html?id=' + artistSongs[i].id + '&type='+ artistSongs[i].type + '" class="a-song">'+ '<img src="'+ artistSongs[i].album.cover + '" class="search-img">'+ '<div class="song-text"><h4 class="text-a">' + artistSongs[i].title + ' </h4><p class="text-b">' + artistSongs[i].artist.name + '</p></div>'+ '<i class="material-icons">more_horiz</i>' +'</a></li>'
                        
                    }
                    lista.innerHTML += theSong
                })
                .catch(function(error) {
                    console.log(error);
                }) 
            hideSpinner();
        })
        .catch(function(error) {
            console.log(error);
        })
}

if(type == 'album'){
    showSpinner();
    fetch(urlGeneral)
        .then(function(response){
            return response.json();
            
        })
        .then(function(datos){
            console.log(datos); //Me va a dar los datos de 1 cancion
            
            let image = document.querySelector(".image-detalle");
            image.innerHTML += '<img src="' + datos.cover_big + '"style="border-radius: 10px 0px 0px 10px;">';

            let titulo = document.querySelector('.titulo-detalle');
            titulo.innerHTML += datos.title;

            let interprete = document.querySelector('.subtitulo1');
            let genres = datos.genres.data;
            let elGenero = '';
            for (let i = 0; i < 1; i++){
                elGenero = '<h3 class="h3-inline"><span style="color:#7acfe8;">GÉNERO: </span> ' + '<a href="generaldetail.html?id=' + datos.genre_id + '&type=genre">' + genres[i].name + '</a></h3>';
            }
            interprete.innerHTML += '<h3 class="h3-inline"><span style="color:#7acfe8;">ARTISTA: </span>' + '<a href ="generaldetail.html?id=' + datos.artist.id  + '&type=artist">'+ datos.artist.name +'</a></h3>' + elGenero;

            let releaseDate = document.querySelector('.subtitulo2');
            releaseDate.innerHTML += datos.release_date;

            let unorderedList = document.querySelector('.widget-player')
            unorderedList.innerHTML += '<section class="scroll-box-album"><ul class="lista"></ul></section>'
            let lista = document.querySelector('.lista')
            let albumTracks = datos.tracks.data;
            let someTracks = '';
            for (let i = 0; i < albumTracks.length; i++) {
                someTracks += '<li class="detail-margins"><a href="generaldetail.html?id=' + albumTracks[i].id + '&type=track' + '" class="a-song">'+ '<img src="'+ datos.cover + '" class="search-img">'+ '<div class="song-text"><h4 class="text-a">' + albumTracks[i].title + ' </h4><p class="text-b">' + albumTracks[i].artist.name + '</p></div>'+ '<i class="material-icons">more_horiz</i>' +'</a></li>';
                
            }
            lista.innerHTML = someTracks
            hideSpinner();
        })
        .catch(function(error) {
            console.log(error);
        })
}

if(type == 'genre'){
    showSpinner();    
    fetch(urlGeneral)
        .then(function(response){
            return response.json();
            
        })
        .then(function(datos){
            console.log(datos);
            let image = document.querySelector(".image-detalle");
            image.innerHTML += '<img src="' + datos.picture_big + '"style="border-radius: 10px 10px 10px 10px;">';

            let titulo = document.querySelector('.titulo-detalle');
            titulo.innerHTML += datos.name;

            let sub1 = document.querySelector('.subtitulo1');
            sub1.style = 'display:none;'

            let theh3 = document.querySelector('.subtitulo2');
            theh3.style = 'display:none;'
            
        
            let urlGenre = urlGeneral + '/artists' //Esto trae los artistas del genero
            fetch(urlGenre)
            .then(function(response){
                return response.json();
                
            })
            .then(function (datos) {
                
                let unorderedList = document.querySelector('.widget-player')
                unorderedList.innerHTML += '<section class="scroll-box-artist"><ul class="lista"></ul></section>'
                let lista = document.querySelector('.lista')
                let artistasGenero = datos.data;
                console.log(artistasGenero);
                let theArtist = '';

                for (let i = 0; i < 30 ; i++) {
                    theArtist += '<li class="detail-margins"><a href="generaldetail.html?id='+ artistasGenero[i].id + '&type=' + artistasGenero[i].type + '" class="a-song">' + '<img src="' + artistasGenero[i].picture + '" class="rounded-img">' + '<div class="song-text"><h4 class="text-a">' + artistasGenero[i].name + '</h4></div>' + '<i class="material-icons">keyboard_arrow_right</i>' + '</a></li>';
                    
                }

                lista.innerHTML = theArtist;
                hideSpinner();
            })
            .catch(function(error) {
                console.log(error);
            })
        })
        .catch(function(error) {
            console.log(error);
        })
}