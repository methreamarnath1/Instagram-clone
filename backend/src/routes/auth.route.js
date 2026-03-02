const express = require("express");
const { registerController, loginController,getMeController} = require("../controllers/auth.controller");
const  identifyUser = require("../middlewares/auth.middleware").identifyUser;
const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @desc register a new user
 * @access public
 */

authRouter.post("/register" , registerController);


/**
 * @route POST /api/auth/login
 * @desc login an existing user
 * @access public
 */
authRouter.post("/login",loginController);

authRouter.get("/get-me",identifyUser, getMeController);

module.exports = authRouter;
