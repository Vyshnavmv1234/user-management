import express from "express";
import userController from "../controller/userControl.js"
import userAuth from "../middleware/userAuth.js";

const router = express.Router()

router.get("/login",userAuth.isLogin,userController.loadLogin)
router.post("/login",userController.login)

router.get("/signup",userAuth.isLogin,userController.loadSignup)
router.post("/signup",userController.registerUser)

router.get("/home",userAuth.checkSession,userController.loadHome)
router.get("/logout",userAuth.checkSession,userController.logout)



const userRoute = router
export default userRoute