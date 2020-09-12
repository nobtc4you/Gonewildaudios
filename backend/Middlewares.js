const sequelize = require('sequelize');
const DataBase = new sequelize(process.env.DB_URL)
const jwt = require('jsonwebtoken')

module.exports = {
    findUser: async (req, res, next) => {
        const db = await DataBase.query(`SELECT * FROM users WHERE User = "${req.body.User}" OR Mail = "${req.body.User}"`, {type: sequelize.QueryTypes.SELECT})
        const dbFind = db.find(item => item.User || item.Mail == req.body.User)
     if(!dbFind){
            return res.status(400).json('Usuario o contraseña incorrectos!');
        } 
        next()  
    },
    validateUser: (req, res, next) => {
        try{
            const token = req.headers.authorization.split(' ')[1]
            const verifyToken = jwt.verify(token, process.env.FIRM_JWT)
            if(verifyToken){
                req.user = verifyToken;  
                return next()
            }
        } catch (err){ 
            console.log("Este error:" + err) 
            res.json({error: 'error al validar usuario'})
        }
    },

}
       
