import express from "express";
import adminController from "../controller/adminControl.js"
import adminAuth from "../middleware/adminAuth.js"
const router = express.Router()

router.get("/login", adminAuth.isLogin, adminController.loadLogin)

router.post("/login",adminController.login)

router.get("/home", adminAuth.checkSession,adminController.loadHome)

router.post("/edit-user", adminAuth.checkSession,adminController.editUser)
router.get("/delete-user/:id",adminAuth.checkSession, adminController.deleteUser)
router.post("/add-user",adminAuth.checkSession,adminController.addUser)

router.get("/logout",adminAuth.checkSession,adminController.logout)
router.get("/search",adminController.searchUser)

const adminRoute = router
export default adminRoute