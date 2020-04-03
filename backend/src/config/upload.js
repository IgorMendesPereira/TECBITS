const multer = require('multer');
const path = require('path');

module.exports = {
storage: new multer.diskStorage({
    destination:path.resolve(__dirname,'..','..','uploads'), //Configuração pra onde nossos arquivos vão
    filename: function(req,file,cb){
        cb(null,file.originalname);  //E o nome do arquivo que vou ousar, ou seja, o nome original do arquivo
    }
})

}