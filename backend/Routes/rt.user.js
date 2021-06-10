const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const ctrlUser = require('../Controllers/ctrl.user');

// Utilisateurs

// Ajoute User à la BDD
router.post('/signup', ctrlUser.signup);

// Renvoie l'Id userId depuis la BDD
router.post('/login', ctrlUser.login);
router.post("/deleteAccount", auth.userCheck, ctrlUser.deleteAccount);
router.get("/users/:id/moderator", auth.userCheck, ctrlUser.isModerator);

module.exports = router;
