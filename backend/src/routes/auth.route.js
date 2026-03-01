const express = require("express");
const { registerController, loginController } = require("../controllers/auth.controller");

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

module.exports = authRouter;
