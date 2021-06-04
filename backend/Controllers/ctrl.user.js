const ENVIRONMENT = require('../env/env.json');
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

// utilisateur

// Inscription

exports.signup = (request, response) => {
    let lastname = request.body.lastname;
    let firstname = request.body.firstname;
    let email = request.body.email;

    /*fnt hash de bcrypt + salt 10 fois le password. Plus la valeur est élevée, 
    + l'execution de la fnt est long et + le hachage sera sécurisé*/
    let password = bcrypt.hashSync(request.body.password, ENVIRONMENT.SALT);

    db.query("SELECT id FROM users WHERE email=?", [email], (error, results) => {
        console.log(error);
        if(results[0]) {
            response.statusCode = 403;
            response.send({message: "BAD"});
            return;
        }

        db.query("INSERT INTO users(lastname, firstname, email, password) VALUES(?, ?, ?, ?)", [lastname, firstname, email, password], (error) => {
            if(error) {
                response.send(error);
            } else {
                response.statusCode = 200;
                response.send({message: "GOOD"});
            }
        });
    });
};

// Connexion

exports.login = (request, response) => {
    let email = request.body.email;
    let password = request.body.password;

    db.query("SELECT id, password FROM users WHERE email=?", [email], (error, results, fields) => {
        if(error) {
            response.statusCode = 403;
            response.send(error);
            return;
        }

        if(!results[0]) { //s'il n'y en a pas de résultat alors réponse "PAS DE RESULTAT"
            response.statusCode = 403;
            response.send({message: "PAS DE RESULTAT ! "});
            return;
        }

        if(bcrypt.compareSync(password, results[0].password)) {
            let payload = {
                id: results[0].id
            };
            let token = jwt.sign(payload, 'shhhhh');
            response.send({token: token});
        } else {
            response.statusCode = 403;
            response.send({message: "MAUVAIS MOT DE PASSE ! "});
        }

    });
};

exports.deleteAccount = (request, response) => {
    let token = request.body.token;

    jwt.verify(token, 'shhhhh', function(error, decoded) {
        if(error) {
            response.statusCode = 403;
            response.send({message: error});
            return;
        }

        db.query("DELETE FROM users WHERE id = ?", [decoded.id], (error, results, fields) => {
            if(error) {
                response.statusCode = 500;
                response.send({message: error});
                return;
            }
            response.send({message: "GOOD"});
        });
    });
};