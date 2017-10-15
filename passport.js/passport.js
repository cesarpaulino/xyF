var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');

module.exports = function (passport) {

    //para mandar serializado el usuario 
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    //para mandar de-serializado el usuario 
    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use(new LocalStrategy({
        //pasar el objeto req una vez llamda la función
        passReqToCallback : true

    },function (req, email, password, done) {
        //para verificar que email se esta mandando
        var config = require('.././database/config');
        //console.log(email);
        //return;
        mongo.connect(config.url, function (err, db) {
            if (err) {
                return console.error(err)
            }
            //accedo a la coleccion con parrots 
            db.collection('Users').find({
                email: email}).toArray(function (err, documents, fields) {
                 if (err) throw err;
                 
                //se imprimen los documentos encontrados 
                console.log(documents)
                //se cierra la conexion a la base de datos
                db.close();
                //si esta en la consulta se trae al docuemnto
                if(documents.length > 0){
                    var user = documents[0];
                    //aqui se compara los password
                    if(bcrypt.compareSync(password, user.password)){
                        //aqui se vuelve a serealizara el objeto user solo con el user con mombre y correo
                        //menos el passeords
                        return done(null,{
                            _id : user._id,
                            nombre : user.nombre,
                            email : user.email
                        });
                    }
                }
                //para mandar el msj del usuario
                return done(null, false, req.flash('authmessage','Email o Password Incorrecto.'));
            });
        });
    }
    ));
};