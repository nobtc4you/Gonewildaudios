const sequelize = require('sequelize');
const dbConf = require('./Database/databaseConf.js');        
const DataBase = new sequelize(`${dbConf.dialect}://${dbConf.user}:${dbConf.password}@${dbConf.host}:${dbConf.port}/${dbConf.db_name}`);

module.exports = {
    getAllPodcast: (req,res) => {
        DataBase.query('SELECT * FROM Podcasts', { type: sequelize.QueryTypes.SELECT })
        .then(result =>res.status(200).json(result))
        .catch(error => console.log(error) || res.status(400).json('Invalid data'))
    }, 
    getPodcastById: (req, res) =>{
        const id = req.params.id
        DataBase.query(`SELECT * FROM Podcasts WHERE Id = ${id}`, { type: sequelize.QueryTypes.SELECT })
        .then(result =>res.status(200).json(result))
        .catch(error => console.log(error) || res.status(400).json('Invalid data'))

    }, 
    postPodcast: (req,res) => {
        const UserId = req.user.user.Id

            DataBase.query(            
            `INSERT INTO Podcasts (Title, Tags, File, UserId) VALUES (:Title, :Tags, :File, ${UserId})`,{
                replacements: req.body
            }).then(result => console.log(result) || res.status(200).json('Podcast added.'))
              .catch(error => console.log(error) || res.status(400).send('Invalid data'))

    }, 
    updatePodcast: (req, res) => {
        const id = req.params.id
        const userId = req.user.user.Id
        const {Title, Tags, File} = req.body
        const isAdimn = req.user.user.isAdmin
        if(isAdimn){
            DataBase.query(`UPDATE Podcasts SET Title = '${Title}', Tags = '${Tags}', File ='${File}'  WHERE Id = ${id}`,{type: sequelize.QueryTypes.SET})
                .then(result => (console.log(result)) || res.status(200).json("Podcast Update OK."))
                .catch(error => console.log(error) || res.status(400).send('Invalid data'))
        } else{ 
            DataBase.query(`UPDATE Podcasts SET Title = '${Title}', Tags = '${Tags}', File ='${File}'  WHERE Id = ${id} AND UserId = ${userId} `,{type: sequelize.QueryTypes.SET})
                .then(result => (console.log(result)) || res.status(200).json("Podcast Update OK."))
                .catch(error => console.log(error) || res.status(400).send('Invalid data'))
        }
      
    }, 
    deletePodcast: (req, res) => {
        const id = req.params.id
                DataBase.query(`DELETE FROM Podcasts WHERE Id = ${id}`,{type: sequelize.QueryTypes.DELETE})
                .then(result => (console.log(result)) || res.status(200).json("Podcast removed."))
                .catch(error => console.log(error) || res.status(400).send('Invalid data'))               
    }
}