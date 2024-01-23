const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");
const app = express();

userRouter
  .post("/", userController.createUser)
  .get("/", userController.getAllUser)
  .post("/login", userController.userLogIn)
  .post("/adminlogin", userController.adminLogIn)
  
  .delete("/:id", userController.deleteUser)
  .get("/checkAuth", userController.userAuthCheck)
  .get("/checkauthadmin", userController.adminAuthCheck)
  .get("/logout/:cookie", userController.logOut);

exports.route = userRouter;
