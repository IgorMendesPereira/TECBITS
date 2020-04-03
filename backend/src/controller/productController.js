const crypto = require('crypto')
const connection = require('../database/connection')
const sharp = require('sharp');  //Resposavel pelo dimensionamento
const path = require('path'); //Resposavel pelos caminhos de forma organizada
const fs = require('fs'); //Resposavel por deletar o arquivo original

module.exports = {
    async index(req,res){
        const { page = 1} = req.query

        const [count] = await connection('products').count()
 
        const products = await connection ('products')
            .limit(5)
            .offset((page -1) * 5)
            .select([
                'products.*',              
            ])

        res.header('X-Total-Count', count['count(*)'])
    
        return res.json(products)
    },
    async create (req,res){
        const { product_name, description, value, amount} = req.body
        
        const fk_user_id = req.headers.authorization
        const product_id = crypto.randomBytes(4).toString('HEX')


        let { filename : image } = req.file;

        let [imgname] = image.split('.'); //separar o name que recebe antes do ponto vai pra nome
        imgname = product_id
        const filename = `${imgname}.jpg`; //coloca .jpg depois do nome

        await sharp(req.file.path)  
        .resize(250,250)  //Dimensiona para o tamanho desejado
        .jpeg({quality: 70 }) //transforma em jpeg e com 70% de qualidade
        .toFile(
            path.resolve(req.file.destination, 'resized', filename) //com essa rota mandamos a foto ediatada para a pasta resized
        )
        fs.unlinkSync(req.file.path); //Deleta o arquivo original

        image = filename
        
        await connection('products').insert({
            product_id,
            product_name,
            description,
            value,
            amount,
            image,
            fk_user_id
        })
        return res.json({product_id})
        
    },
    
    async delete (req,res){
         const { product_id } = req.params
         //const user_id = req.headers.authorization
         
         await connection('products')
         .where('product_id', product_id)
         .select('product_id')
         .first()

         if (product_id !== product_id){
            return res.status(401).json({error: 'Operation not permitted.'})
        }

         await connection('products').where('product_id',product_id).delete()

         return res.status(204).send()
    }
}


// module.exports = {
//     async index(req,res){
//         const products = await connection ('products').select('*')
    
//         return res.json(products)
//     },
    
    

// }