const sequelize = require('sequelize');
const dbConf = require('./Database/databaseConf.js');        
const DataBase = new sequelize(`${dbConf.dialect}://${dbConf.user}:${dbConf.password}@${dbConf.host}:${dbConf.port}/${dbConf.db_name}`);

module.exports = {
    getAllPodcast: (req,res) => {
        DataBase.query('SELECT * FROM podcasts', { type: sequelize.QueryTypes.SELECT })
        .then(result =>res.status(200).json(result))
        .catch(error => console.log(error) || res.status(400).json('Invalid data'))
    }, 
/*     getPodcastByTag: (req, res) =>{
        const tag = req.tag


    },  */
/*     postPodcast: (req,res) => {
        const UserId = req.user.user
            DataBase.query(            
            `INSERT INTO podcasts (Title, tags, File, UserId) VALUES (:Title, :tags, :File, ${UserId})`,{
                replacements: req.body
            }).then(result => console.log(result) || res.status(200).json('Producto Agregado'))
              .catch(error => console.log(error) || res.status(400).send('Invalid data'))

    } *//* , 
    updatePodcast: () => {

    }, 
    deletePodcast: () => {

    } */
}