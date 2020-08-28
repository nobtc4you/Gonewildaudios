const sequelize = require('sequelize');
const dbConf = require('./Database/databaseConf.js');     
const DataBase = new sequelize(`${dbConf.dialect}://${dbConf.user}:${dbConf.password}@${dbConf.host}:${dbConf.port}/${dbConf.db_name}`);
const jwt = require('jsonwebtoken')
const firm = 'gwa' 
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
            const verifyToken = jwt.verify(token, firm)
            if(verifyToken){
                req.user = verifyToken;  
                return next()
            }
        } catch (err){ 
            console.log("Este error:" + err) 
            res.json({error: 'error al validar usuario'})
        }
    }


  /*

    validarIdProducto: async (req, res, next) => {
            const db = await DataBase.query(`SELECT * FROM productos WHERE id = ${req.params.id}`, {type: sequelize.QueryTypes.SELECT})
            const dbFind = db.find(item => item.id == req.params.id)
            if(!dbFind){
                return res.status(400).json('Id incorrecto');
            } 
            next() 
    },



    onlyAdmin: (req, res, next) => {
        try{
            const token = req.headers.authorization.split(' ')[1]
            const verifyToken = jwt.verify(token, firm)
            if(verifyToken){
                req.user = verifyToken;
                if(req.user.user.is_admin == 1){
                    return next()
                } else{ 
                    res.json({error: 'Solo administradores'})
                }

            }
        } catch (err){
            res.json({error: 'error al validar usuario'})
        }

    },

    ,
    validarIdPedido: async (req, res, next) => {
        const db = await DataBase.query(`SELECT * FROM pedidos WHERE id = ${req.params.id}`, {type: sequelize.QueryTypes.SELECT})
        const dbFind = db.find(item => item.id == req.params.id)
        if(!dbFind){
            return res.status(400).json('Id incorrecto');
        } 
        next() 
}, */
}
       
