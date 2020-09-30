const sequelize = require('sequelize');
// const DataBase = new sequelize(process.env.DB_URL)
const DataBase = new sequelize(process.env.RDS_DB_NAME, process.env.RDS_USERNAME,  process.env.RDS_PASSWORD, {
  host: process.env.RDS_HOSTNAME,
  dialect: 'mysql'
});

module.exports = {
    getFavorites: (req,res) => {
        const userId = req.user.user.Id
        DataBase.query(`SELECT f.*,u.User, p.Title FROM Favorites f JOIN Users u ON f.UserId = u.Id JOIN Podcasts p ON f.PodcastId = p.Id WHERE f.UserId = ${userId}` , { type: sequelize.QueryTypes.SELECT })
        .then(result =>res.status(200).json(result))
        .catch(error => console.log(error) || res.status(400).json('Invalid data'))
    },
    insertFavorite: async (req, res) =>{
        const userId = req.user.user.Id
        const podacastId = req.params.id
            const check = await DataBase.query(`SELECT * FROM Favorites WHERE UserId = ${userId} AND PodcastId = ${podacastId}`)

            if(check[0]==""){
                await DataBase.query(
                    `INSERT INTO Favorites (UserId, PodcastId) VALUES (${userId}, ${podacastId})`,{
                        replacements: req.body
                    }).then(result => console.log(result) || res.status(200).json('Podcast added to favorites.'))
                      .catch(error => console.log(error) || res.status(400).send('Invalid data'))
            }else{
                res.json({error: 'Already added.'})
            }



    },
    deleteFavorite: (req, res) => {
        const id = req.params.id
        DataBase.query(`DELETE FROM Favorites WHERE Id = ${id}`,{type: sequelize.QueryTypes.DELETE})
        .then(result => (console.log(result)) || res.status(200).json("Podcast removed from favorites."))
        .catch(error => console.log(error) || res.status(400).send('Invalid data'))
    }
}
