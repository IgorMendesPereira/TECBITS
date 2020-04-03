const crypto = require('crypto')
const connection = require('../database/connection')

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
    
        await connection('products').insert({
            product_name,
            description,
            value,
            amount,
            product_id,
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