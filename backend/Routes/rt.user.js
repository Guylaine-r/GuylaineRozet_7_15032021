const express = require("express");
const router = express.Router();
const ctrlUser = require('../Controllers/ctrl.user');

// Utilisateurs

// Ajoute User à la BDD
router.post('/signup', ctrlUser.signup);

// Renvoie l'Id userId depuis la BDD
router.post('/login', ctrlUser.login);

router.post("/deleteAccount", ctrlUser.deleteAccount);

module.exports = router;
