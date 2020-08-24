const api = require('express')();
const bodyParserJson = require('body-parser').json();
const cors = require('cors');
const { signUp, logIn, /* updateUser, deleteUser*/} = require('./Users')
const {getAllPodcast, /* getPodcastByTag, */ postPodcast,/*  updatePodcast, deletePodcast */} = require('./Podcasts')
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

api.post('/Users', signUp)
api.post('/Users/login', findUser, logIn)
/* api.put('/Users', userOK, updateUser)
api.delete('/Users/:id', userOK, deleteUser)  */

//... Podacast's endpoints ...

api.get('/Podcasts', getAllPodcast)
/* api.get('/Podcasts/:tag', getPodcastByTag) */
api.post('/Podcasts', validateUser, postPodcast )
/* api.put('/Podcasts/:id', updatePodcast)
api.delete('/Podcasts/:id', deletePodcast) */