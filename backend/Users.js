const sequelize = require('sequelize');
const dbConf = require('./Database/databaseConf.js');        
const DataBase = new sequelize(`${dbConf.dialect}://${dbConf.user}:${dbConf.password}@${dbConf.host}:${dbConf.port}/${dbConf.db_name}`);
const jwt = require('jsonwebtoken')
const firm = 'gwa'

module.exports ={

    signUp: (req, res) =>{
        DataBase.query(
            'INSERT INTO Users (User, Mail, Password, About_me) VALUES (:User, :Mail, :Password, :About_me)',{
                replacements: req.body
            }).then(result => console.log(result) || res.status(200).json('User sign up: Ok'))
              .catch(error => console.log(error) || res.status(400).send('Invalid data'))
    },

    logIn: async (req,res) =>{
        const reqUser = req.body.User
        const reqPass = req.body.Password
        const password = await DataBase.query(`SELECT Id, Password FROM Users WHERE User = "${reqUser}"`, { type: sequelize.QueryTypes.SELECT })
        const isAdmin = await DataBase.query(`SELECT Id, IsAdmin FROM Users WHERE User = "${reqUser}"`, { type: sequelize.QueryTypes.SELECT })
        const passwordOk = password[0].Password
        const adminOk = isAdmin.find(item => item.is_admin === 1)
       
        if(passwordOk == reqPass){
            if(adminOk == undefined){
                const user = password[0]
                const token = jwt.sign({
                    user
                }, firm)
                res.json({token})
            }else { 
                const user = isAdmin[0]
                const token = jwt.sign({
                    user,
                    isAdmin
                }, firm)
                res.json({token})
            }

        }else { 
            res.json('Usuario o contraseña incorrectos!')
        }
    
    },

   /*  updateClient: (req, res) => { 
        const id = req.user.user.id
        const newTelefono = req.body.telefono
        const newDireccion = req.body.direccion
        const newEmail = req.body.email
        DataBase.query(`UPDATE clientes SET telefono = ${newTelefono}, direccion = "${newDireccion}", email = "${newEmail}" WHERE id = ${id}`,{type: sequelize.QueryTypes.SET})
        .then(result => (console.log(result)) || res.status(200).json("Usuario Actualizado"))
        .catch(error => console.log(error) || res.status(400).send('Invalid data')) 
    },

    getClients: (req,res)=>{
        DataBase.query('SELECT * FROM clientes', { type: sequelize.QueryTypes.SELECT }).then(result =>res.status(200).json(result))

    },
    
    deleteClient: (req, res) => { 
        const id = req.params.id   
            DataBase.query(`DELETE FROM clientes WHERE id = ${id}`,{type: sequelize.QueryTypes.DELETE})
            .then(result => (console.log(result)) || res.status(200).json("Cliente Eliminado"))
            .catch(error => console.log(error) || res.status(400).send('Invalid data'))  
    } */
} 
