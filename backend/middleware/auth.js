const jwt = require('jsonwebtoken');
const db = require('../db');

exports.userCheck = (request, response, next) => {
    try {
        const token = request.headers.authorization;
        if(token == null || token == undefined) {
            response.sendStatus(401);
            return;
        }

        const decodedToken = jwt.verify(token, 'shhhhh');
        db.query('SELECT * FROM user WHERE id = ?', [decodedToken.id], (error, results, fields) => {
            if (error) {
                response.send(error);
                return;
            }

            if (!results[0]) { // S'il n'y en a pas de résultat alors réponse "PAS DE RESULTAT"
                response.statusCode = 401;
                response.send({ message: "Nonexistant user" });
                return;
            }
            request.userId = decodedToken.id;
            next() // On passe à la requête principale
        });

    } catch (error) {
        console.error(error);
        response.status(401).json({ error: error | 'requête non authentifié !' });
    }
};

exports.moderatorCheck = (request, response, next) => {
    let id = request.userId;
    db.query("SELECT moderator FROM user WHERE id=?", [id], (error, results, fields) => {
        if(error) {
            response.send(error);
            return;
        }
        if (!results[0]) { // S'il n'y en a pas de résultat alors réponse "PAS DE RESULTAT"
            response.statusCode = 401;
            response.send({ message: "Nonexistant user" });
            return;
        }

        if(results[0].moderator == false) {
            response.sendStatus(403);
            return;
        }
        next();
    });
}