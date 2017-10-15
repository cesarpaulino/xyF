var mongo = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');

module.exports = {
    
    getSignUp: function (req, res, next) {
        return res.render('users/signup');
    },

    postSignUp: function(req, res, next){
        //nivel de la encriptacion el numero podemos ponerlo mas elevado dependiendo de la dificultad que queramos
        var salt = bcrypt.genSaltSync(10)
            //pedimos la propiedad password y le pasamos el objeto salt
            var password = bcrypt.hashSync(req.body.password, salt);
            //objeto json
            var user = {
                _id :auto,
                email: req.body.email,
                nombre: req.body.nombre,
                password: password
            }
            //pasamos la configuracion de la base de datos
            var config = require('.././database/config');
    
            //creamos la coneccion a la base de datos 
            var url = config.url;
            console.log(`> BD: ${url}`);
            //insertamos los datos 
            mongo.connect(url, function (err, db) {
                if (err) throw err
                var collection = db.collection('Users')
                collection.insert(user, function (err, data) {
                    if (err) throw err
                    console.log(JSON.stringify(user))
                    db.close()
                });
            });
            return res.redirect('/auth/signin');
        },
    
        getSignIn: function(req, res, next){
            return res.render('users/signin');
        }
}