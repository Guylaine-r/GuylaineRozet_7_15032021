const ENVIRONMENT = require("./env/env.json"); 
const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const rtUser = require('./Routes/rt.user');
const rtPost = require('./Routes/rt.post');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const multer = require("./middleware/multer-config.js");
const fs = require("fs");


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100, // limite à 100 requêtes/15min  par windowMs
    message: 'too many requests sent by this ip, please try again in 15 minutes'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());// Pour pouvoir récupérer les requêtes au format JSON
app.use(bodyParser.urlencoded({ extended: true }));// Pour pouvoir traiter les informations de formulaire
app.use(helmet());// Pour renforcer la sécurité de l'app
app.use(limiter);

// LES ROUTES
app.use('/', rtUser);
app.use('/', rtPost)


// middleware => headers permettent :
// acceder aux APIs depuis n'importe quelle origine (*)
//ajouter les headers mentionnées aux requêtes envoyées vers les APIs
// envoyer des requêtes avec des méthodes mentionnées (GET, POST, etc)


app.listen(3000, function () {
    console.log('Server started ...')
});

module.exports = app;


