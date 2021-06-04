const jwt = require('jsonwebtoken');
const db = require('../db');


module.exports = (request, response, next) => {
    try {
        const token = request.headers.authorization.split('')[1];
        const decodeToken = jwt.verify(token, 'shhhhh');
        db.query('SELECT * FROM users WHERE id = ?', [decodeToken.id], (error, results, fields) => {
            if (error) {
                response.statusCode = 403;
                response.send(error);
                return;
            }

            if (!results[0]) { //s'il n'y en a pas de résultat alors réponse "PAS DE RESULTAT"
                response.statusCode = 403;
                response.send({ message: "PAS DE RESULTAT ! " });
                return;
            }
            request.token = token;
            //on passe à la requête principale
            next()
        });

    } catch (error) {
        console.error(error);
        response.status(401).json({ error: error | 'requête non authentifié !' });
    }
};