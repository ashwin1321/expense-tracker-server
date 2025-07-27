const {
  homeController,
  loginController,
  registerController,
} = require("../controllers/userController");

const express = require("express");

const router = express.Router();

//ROUTES

// GET
router.get("/home", homeController);

// POST  || LOGIN
router.post("/login", loginController);

// POST || REGISTER
router.post("/register", registerController);

module.exports = router;
