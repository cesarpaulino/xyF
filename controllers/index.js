var fs = require('fs');
var path = require('path')
//nos devuelve el directorio actual
var files = fs.readdirSync(__dirname);

files.forEach(function(file){
    var fileName = path.basename(file, '.js');

    if(fileName !== 'index'){
        exports[fileName] =require('./'+fileName);
        //autocargar los controladores 
    }
});