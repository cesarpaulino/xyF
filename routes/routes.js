var AuthMiddleware = require('.././middleware/auth');
var controllers = require('.././controllers');
var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', controllers.HomeController.index);
//rutas de usuario

router.get('/auth/signup', controllers.UserController.getSignUp);
router.post('/auth/signup', controllers.UserController.postSignUp);
router.get('/auth/signin', controllers.UserController.getSignIn);

//llamdo a la funcion de autentificación
router.post('/auth/signin', passport.authenticate('local', {
    successRedirect: '/users/panel',
    failureRedirect: '/auth/signin',
    failureFlash: true
}));

//router.get('/users/alta',  AuthMiddleware.isLogged, controllers.UserController.getalta);
//router.post('/users/alta', controllers.UserController.postalta);

//router.get('/users/buscar',  AuthMiddleware.isLogged, controllers.UserController.getbuscar);
//router.post('/users/buscar', controllers.UserController.postbuscar);

module.exports = router;
