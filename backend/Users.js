const sequelize = require('sequelize');
const DataBase = new sequelize(process.env.DB_URL)
const jwt = require('jsonwebtoken');
 

module.exports ={
    getUserbyId:(req,res)=> {
        const id = req.params.id
        DataBase.query(`SELECT * FROM users WHERE Id = "${id}"`, { type: sequelize.QueryTypes.SELECT })
        .then(result =>res.status(200).json(result))
        .catch(error => console.log(error) || res.status(400).json('Invalid data'))
    },
    verifyUsername: async (req,res) => {
        const user = req.params.user
        const db = await DataBase.query(`SELECT * FROM users WHERE User = "${user}"`, {type: sequelize.QueryTypes.SELECT})
        const dbFind = db.find(item => item.User == user)
     if(!dbFind){
        return res.status(200).json('Correct user');
        }else {
            return res.status(400).json('Username already in use');
        }
          
    },
    verifyMail: async (req,res) => {
        const mail = req.params.mail
        const db = await DataBase.query(`SELECT * FROM users WHERE Mail = "${mail}"`, {type: sequelize.QueryTypes.SELECT})
        const dbFind = db.find(item => item.Mail == mail)
     if(!dbFind){
        return res.status(200).json('Correct mail');
        }else {
            return res.status(400).json('Email already in use');
        }
    },
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
        const password = await DataBase.query(`SELECT Id, Password FROM Users WHERE User = "${reqUser}" OR Mail = "${reqUser}"`, { type: sequelize.QueryTypes.SELECT })
        const isAdmin = await DataBase.query(`SELECT Id, IsAdmin FROM Users WHERE User = "${reqUser}" OR Mail = "${reqUser}"`, { type: sequelize.QueryTypes.SELECT })
        const passwordOk = password[0].Password
        const adminOk = isAdmin.find(item => item.is_admin === 1)
       
        if(passwordOk == reqPass){
            if(adminOk == undefined){
                const user = password[0]
                const token = jwt.sign({
                    user
                }, process.env.FIRM_JWT)
                res.json({token})
            }else { 
                const user = isAdmin[0]
                const token = jwt.sign({
                    user,
                    isAdmin
                }, process.env.FIRM_JWT)
                res.json({token})
            }

        }else { 
            res.json('Usuario o contraseña incorrectos!')
        }
    
    },
    updateUser: (req, res) => { 
        const id = req.user.user.id
        const password = req.body.Password
        const aboutMe = req.body.AboutMe
        DataBase.query(`UPDATE Users SET password = ${password}, About_me = "${aboutMe}" WHERE id = ${id}`,{type: sequelize.QueryTypes.SET})
        .then(result => (console.log(result)) || res.status(200).json("Usuario Actualizado"))
        .catch(error => console.log(error) || res.status(400).send('Invalid data')) 
    },
    deleteUser: (req, res) => { 
        const id = req.params.id   
            DataBase.query(`DELETE FROM Users WHERE id = ${id}`,{type: sequelize.QueryTypes.DELETE})
            .then(result => (console.log(result)) || res.status(200).json("User eliminated."))
            .catch(error => console.log(error) || res.status(400).send('Invalid data'))  
    },
    validateUserPrivate: async (req,res) => {
        const idToken = req.user.user.Id
        
        const idUser = req.body.id
        const resp = await DataBase.query(`SELECT * FROM Users WHERE Id = ${idToken}`, { type: sequelize.QueryTypes.SELECT })

        if(resp[0].Id == idUser){
            console.log("mira" + idUser)
            res.json(idToken);
        }else { res.json("false")} 
    }
} 
