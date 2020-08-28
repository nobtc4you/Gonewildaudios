const sequelize = require('sequelize');
const dbConf = require('./Database/databaseConf.js');        
const DataBase = new sequelize(`${dbConf.dialect}://${dbConf.user}:${dbConf.password}@${dbConf.host}:${dbConf.port}/${dbConf.db_name}`);

module.exports = {
    getFavorites: (req,res) => {
        const userId = req.user.user.Id
        DataBase.query(`SELECT * FROM Favorites WHERE UserId = ${userId}` , { type: sequelize.QueryTypes.SELECT })
        .then(result =>res.status(200).json(result))
        .catch(error => console.log(error) || res.status(400).json('Invalid data'))
    },
    insertFavorite: (req, res) =>{
        const userId = req.user.user.Id
        const podacastId = req.params.id

            DataBase.query(            
            `INSERT INTO Favorites (UserId, PodcastId) VALUES (${userId}, ${podacastId})`,{
                replacements: req.body
            }).then(result => console.log(result) || res.status(200).json('Podcast added to favorites.'))
              .catch(error => console.log(error) || res.status(400).send('Invalid data'))

    },
    deleteFavorite: (req, res) => {
        const id = req.params.id
        DataBase.query(`DELETE FROM Favorites WHERE Id = ${id}`,{type: sequelize.QueryTypes.DELETE})
        .then(result => (console.log(result)) || res.status(200).json("Podcast removed from favorites."))
        .catch(error => console.log(error) || res.status(400).send('Invalid data')) 
    }
}


