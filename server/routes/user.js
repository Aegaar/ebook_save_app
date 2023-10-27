const express = require("express");

const { signUpUser, loginUser } = require("../controllers/usersController");

const router = express.Router();

router.post("/logowanie", loginUser);

router.post("/rejestracja", signUpUser);

module.exports = router;
