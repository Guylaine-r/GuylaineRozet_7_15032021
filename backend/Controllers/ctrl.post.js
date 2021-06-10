const { UV_FS_O_FILEMAP } = require("constants");
const db = require("../db");
const fs = require("fs");
const { query } = require("../db");
const { response } = require("express");

exports.getAllPosts = (request, response) => {
    db.query("SELECT * FROM post", function (error, results) {
        response.statusCode = 200;
        response.send(results);
    });
}

exports.getPost = (request, response) => {
    let id = request.params.id;
    db.query("SELECT post.*, user.firstname, user.lastname FROM post INNER JOIN user ON post.author=user.id WHERE post.id=?", [id], function(error, results) {
        if(error) {
            response.send(error);
            return;
        }
        response.statusCode = 200;
        response.send(results[0]);
    });
}

exports.getPostComments = (request, response) => {
    let id = request.params.id;
    db.query("SELECT comment.*, user.firstname, user.lastname FROM comment INNER JOIN user ON comment.author=user.id WHERE comment.post=?", [id], function(error, results) {
        if(error) {
            response.send(error);
            return;
        }
        response.send(results);
    });
}

exports.createPost = (request, response) => {
    let userId = request.userId;
    let title = request.body.title;
    let text = request.body.text;
    let data = request.body.data;

    // Récupérer le type de données depuis data
    let start = data.indexOf(":");
    let end = data.indexOf(";");
    let type = data.substring(start+1, end);
    
    // Récupérer que les informations en base 64
    start = data.indexOf("base64") + 7;
    data = data.substring(start);

    db.query("INSERT INTO post(title, text, author, type) VALUES(?, ?, ?, ?)", [title, text, userId, type], (error, results) => {
        if(error) {
            response.statusCode = 500;
            response.send({message: error});
            return;
        }
        let id = results.insertId;
        fs.writeFileSync("./images/" + id + ".png", data, "base64");
        response.statusCode = 200;
        response.send({message: "GOOD", id: id});
    });
}

exports.deletePost = (request, response) => {
    let id = request.params.id;
    db.query("DELETE FROM post WHERE id=?", [id], (error, results, fields) => {
        if(error) {
            response.statusCode = 500;
            response.send(error);
            return;
        }
        response.statusCode = 200;
        response.send({message: "OK"});
    });
}

exports.deleteComment = (request, response) => {
    let id = request.params.id;
    db.query("DELETE FROM comment WHERE id=?", [id], (error, results, fields) => {
        if(error) {
            response.statusCode = 500;
            response.send(error);
            return;
        }
        response.statusCode = 200;
        response.send({message: "OK"});
    });
}