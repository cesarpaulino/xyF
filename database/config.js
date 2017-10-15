var config = {
    //conexion de forma local al (localhost)
    "url": process.env.DB || "mongodb://127.0.0.1:27017/vehiculos"
    //conexion en la cloud al (localhost)
    //"url": process.env.DB || "mongodb://cesar:paulino@ds139949.mlab.com:39949/condos"
    };
    
    module.exports = config