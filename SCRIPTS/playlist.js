let recuperoStorage = localStorage.getItem('playlist');
let playlist = JSON.parse(recuperoStorage);
let playlistWrapper = document.querySelector('.playlistWrapper');

if(recuperoStorage == null){
    playlist = [];
    playlistWrapper.innerHTML += '<li> No hay canciones en tu playlist </li>'

}else{
    playlist.forEach(function(idGeneral){
        buscarYMostrarTrack(idGeneral);
    
    });

}

function buscarYMostrarTrack(idGeneral){
    let proxy = "https://cors-anywhere.herokuapp.com/";
    let url = proxy + "https://api.deezer.com/track/" + idGeneral;
    let lista = document.querySelector('.playlistWrapper')

    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(track) {

        let lista = document.querySelector('.playlistWrapper')
        
        lista.innerHTML += '<li class="track-search-list"><a href="generaldetail.html?id=' + track.id + '&type='+ track.type + '" class="a-song">'+ '<img src="'+ track.album.cover + '" class="search-img">'+ '<div class="song-text"><h4 class="text-a">' + track.title + ' </h4><p class="text-b">' + track.artist.name + '</p></div>'+ '<i class="material-icons">more_horiz</i>' +'</a></li>'

    }) 
    
    .catch(function(errors){
        console.log(errors);
    })
}
