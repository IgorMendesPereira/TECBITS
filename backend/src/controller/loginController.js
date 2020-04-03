const bcrypt = require('bcryptjs') //Lib de criptografia
const jwt = require('jsonwebtoken') //Gerador de token via JSON
const connection = require('../database/connection')
require("dotenv").config(); //Arquivo que configura o .env do token

module.exports = {
    login(req, res) {
        
        const name = req.params.name.toLowerCase()
        const password = req.body.password
        connection('users')
            .where('name', name)
            // .select('user_id')
            // .first()
            .then(users => {
                users.forEach(user => {
                    bcrypt.compare(password, user.password, (err, results) => {
                        if (err) {
                            return res.status(401).send({ mensagem: "Falha na Autenticação" })
                        }
                        if (results) {
                            const token = jwt.sign({
                                user_id: user.user_id,
                                name,
                                password
                            },
                                process.env.JWT_KEY,
                                {
                                    expiresIn: "100000d"
                                })
                            return res.status(200).send({
                                mensagem: 'Autenticado',
                                token: token
                            })
                        }
                        return res.json({ mensagem: "Falha na Autenticação" })
                    })
                })
                if (users.length <= 0) {
                    return res.json({ mensagem: "Falha na Autenticação" });
                }
            })
            // else {return res.json({ mensagem: "Falha na Autenticação" })}
    }
}