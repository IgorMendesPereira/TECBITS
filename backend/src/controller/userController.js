const crypto = require('crypto')
const connection = require('../database/connection')

const bcrypt = require('bcryptjs') //Lib de criptografia

let i = 0
let test = 0

module.exports = {
    async index(req,res){
        const users = await connection ('users').select('*')
    
        return res.json(users)
    },
    
    async create (req,res){
        const users = await connection ('users').select('*')
        const name = req.body.name.toLowerCase()
        while (i != users.length && test === 0){
            if(name === users[i].name){
                console.log('Comparaçãao', name,users[i].name)
                test = 1;
            }else{test === 0, console.log('Comparaçãao', name,users[i].name) } 
            i = i + 1
        }
        i = 0
        if(test === 1){
            return res.json({ mensagem: "Nome de usuário existente" })
        } else{
        const user_id = crypto.randomBytes(4).toString('HEX')
        const password = bcrypt.hashSync(req.body.password, 10)

         await connection('users').insert({
            user_id,
            name,
            password,
        })
        
        return res.json({user_id})
        
        
    }}

}