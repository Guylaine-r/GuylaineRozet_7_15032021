const db = require("../db");

exports.createPost = (request, response) => {
    let token = request.body.token;
    let title = request.body.title;
    let text = request.body.text;
    let type = request.file.type;

    console.log(token);
    console.log(title);
    console.log(text);
    console.log(type);
    response.send({message: "GOOD"});
    return;

    jwt.verify(token, 'shhhhh', function(error, decoded) {
        if(error) {
            response.statusCode = 403;
            response.send({message: error});
            return;
        }

        db.query("INSERT INTO post(title, text, author, type) VALUES(?, ?, ?, ?)", [title, text, decode.id, type], (error) => {
            if(error) {
                response.statusCode = 500;
                response.send({message: error});
                return;
            }

            
        });
    });
}