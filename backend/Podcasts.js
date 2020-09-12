const sequelize = require('sequelize');
const DataBase = new sequelize(process.env.DB_URL)
module.exports = {
    getAllPodcast: (req,res) => {
        const limit = req.query.limit  
        DataBase.query(`SELECT Podcasts.*, Users.User FROM Podcasts JOIN Users ON UserId = Users.id LIMIT ${limit} `, { type: sequelize.QueryTypes.SELECT })
        .then(result =>res.status(200).json(result))
        .catch(error => console.log(error) || res.status(400).json('Invalid data'))
    }, 
    getPodcastById: (req, res) =>{
        const id = req.params.id
        DataBase.query(`SELECT Podcasts.*, Users.User FROM Podcasts JOIN Users ON UserId = Users.id  WHERE Podcasts.Id = ${id}`, { type: sequelize.QueryTypes.SELECT })
        .then(result =>res.status(200).json(result))
        .catch(error => console.log(error) || res.status(400).json('Invalid data'))

    }, 
    getPodcastByUserId: (req,res) => {
        const userId = req.params.id
        DataBase.query(`SELECT * FROM Podcasts WHERE UserId = ${userId}`, { type: sequelize.QueryTypes.SELECT })
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
        const isAdimn = req.user.user.isAdmin
        const userId = req.user.user.Id
        if(isAdimn){
            DataBase.query(`DELETE FROM Podcasts WHERE Id = ${id}`,{type: sequelize.QueryTypes.DELETE})
            .then(result => (console.log(result)) || res.status(200).json("Podcast removed."))
            .catch(error => console.log(error) || res.status(400).send('Invalid data'))     
        } else{ 
            DataBase.query(`DELETE FROM Podcasts WHERE Id = ${id} AND UserId = ${userId}`,{type: sequelize.QueryTypes.DELETE})
            .then(result => (console.log(result)) || res.status(200).json("Podcast removed."))
            .catch(error => console.log(error) || res.status(400).send('Invalid data'))     
        }                         
    }
}