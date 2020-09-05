if(process.env.NODE_ENV === "development"){
    require('dotenv').config();
}

const api = require('express')();
const bodyParserJson = require('body-parser').json();
const cors = require('cors');
const {getUserbyId, verifyUsername, verifyMail, signUp, logIn, updateUser, deleteUser} = require('./Users')
const {getAllPodcast, getPodcastById, getPodcastByUserId, postPodcast, updatePodcast , deletePodcast} = require('./Podcasts')
const {getFavorites, insertFavorite, deleteFavorite} = require('./Favorites')
const {findUser, validateUser} = require('./Middlewares')


api.listen(3000,()=> console.log('servidor iniciado...'))
api.use(bodyParserJson)
api.use(cors());
api.use(function(err, req, res, next) {
    if(!err) return next();
    console.log('Error, algo salio mal', err);
    res.status(500).send('Error');
});

//... User's endpoints ...
api.get('/User/:id', getUserbyId)
api.get('/Users/:user', verifyUsername)
api.get('/Users/user/:mail', verifyMail)
api.post('/Users', signUp)
api.post('/Users/login', findUser, logIn)
api.put('/Users', validateUser, updateUser)
api.delete('/Users', validateUser, deleteUser) 

//... Podacast's endpoints ...

api.get('/Podcasts', getAllPodcast)
/* api.get('Podcasts/:orientation') */
api.get('/Podcast/:id', getPodcastById)
api.get('/Podcasts/User',validateUser, getPodcastByUserId)
api.post('/Podcasts', validateUser, postPodcast )
api.put('/Podcast/:id', validateUser, updatePodcast)
api.delete('/Podcast/:id', validateUser, deletePodcast) 

// ... Favorites ...

api.get('/Favorites', validateUser, getFavorites)
api.post('/Favorites/:id', validateUser, insertFavorite)
api.delete('/Favorites/:id', deleteFavorite)

