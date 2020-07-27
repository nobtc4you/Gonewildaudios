console.log('Welcome to our kingdom...');
let proxy = 'https://cors-anywhere.herokuapp.com/';

//topArtists
let urlArtists = proxy + "https://api.deezer.com/chart/0/artists";

fetch(urlArtists)
    .then(function(response){
        return response.json();
    })
    .then(function(datos){
        let artists = datos.data;
        let topArtists = document.querySelector('.chartArtists');

        artists.forEach(function(artist){
            console.log(artist);
            let div = document.createElement('div');
            div.classList.add('artlist');
            
            let img = document.createElement('img');
            img.src = artist.picture;
            img.classList.add('artlistImg');
            img.alt = artist.name;

            let div2 = document.createElement('div');
            div2.classList.add('song-text');

            let link = document.createElement('a');
            link.href = 'generaldetail.html?id='+ artist.id + '&type=artist';

            let linktext = document.createElement('h4');
            linktext.classList.add('item-2');
            linktext.innerHTML = artist.name;

            let item = document.createElement('i');
            item.classList.add('material-icons');
            item.innerHTML = 'more_horiz';
            
            div.appendChild(img);
            div.appendChild(div2);
            div2.appendChild(link);
            link.appendChild(linktext);
            div.appendChild(item);
            topArtists.appendChild(div);
        })
    })
    .catch(function(error){
        console.log(error);
    })

//topTracks
let urlTracks = proxy + "https://api.deezer.com/chart/0/tracks";

fetch(urlTracks)
    .then(function(response){
        return response.json();
    })
    .then(function(datos){
        let tracks = datos.data;
        let topTracks = document.querySelector('.chartTracks')

        tracks.forEach(function(track){
            console.log(track);
            let listSongs = document.createElement('div');
            listSongs.classList.add('songlists');

            let songImg = document.createElement('img');
            songImg.src = track.artist.picture;
            songImg.classList.add('songlistsImg');
            songImg.alt = track.title_short;

            let textSong = document.createElement('div');
            textSong.classList.add('song-text');

            let songLink = document.createElement('a');
            songLink.href = 'generaldetail.html?id='+ track.id + '&type=track'; 

            let songTitle = document.createElement('h4');
            songTitle.classList.add('item-2');
            songTitle.innerHTML = track.title;

            let artistLink = document.createElement('a');
            artistLink.href = 'generaldetail.html?id='+ track.artist.id + '&type=artist';

            let songArtist= document.createElement('p');
            songArtist.classList.add('item-2');
            songArtist.innerHTML = track.artist.name;

            let puntitosItem = document.createElement('i');
            puntitosItem.classList.add('material-icons');
            puntitosItem.innerHTML = 'more_horiz';

            listSongs.appendChild(songImg);
            listSongs.appendChild(textSong);
            textSong.appendChild(songLink);
            songLink.appendChild(songTitle);
            textSong.appendChild(artistLink);
            artistLink.appendChild(songArtist);
            listSongs.appendChild(puntitosItem);
            topTracks.appendChild(listSongs);
        })
        })
    .catch(function(error){
        console.log(error);
    })

//topAlbums
let urlAlbums = proxy + "https://api.deezer.com/chart/0/albums"

fetch(urlAlbums)
    .then(function(response){
        return response.json();
    })
    .then(function(datos){
        let albums = datos.data;
        let topAlbums = document.querySelector('.chartAlbums')

        let count = 0;

        albums.forEach(function(album){
            console.log(album)
            let listAlbum = document.createElement('div');
            listAlbum.classList.add('alblist');

            let albumImg = document.createElement('img');
            albumImg.src = album.cover_big;
            albumImg.classList.add('alblistImg');
            albumImg.alt = album.title;

            let albumLink = document.createElement('a');
            albumLink.href = 'generaldetail.html?id='+ album.id + '&type=album';
            
            let albumTitle = document.createElement('h4');
            albumTitle.classList.add('item-3');
            albumTitle.innerHTML = album.title;

            let linkArtist = document.createElement('a');
            linkArtist.href = 'generaldetail.html?id='+ album.artist.id + '&type=artist'

            let albumArtist = document.createElement('p');
            albumArtist.classList.add('item-3');
            albumArtist.innerHTML = album.artist.name;

            let itemPuntitos = document.createElement('i');
            itemPuntitos.classList.add('material-icons');
            itemPuntitos.innerHTML = 'more_horiz';

            listAlbum.appendChild(albumImg);
            listAlbum.appendChild(albumLink);
            albumLink.appendChild(albumTitle);
            listAlbum.appendChild(linkArtist);
            linkArtist.appendChild(albumArtist);
            count++;
            if (count < 10) topAlbums.appendChild(listAlbum);
        })
    })