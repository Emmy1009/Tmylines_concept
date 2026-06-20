import {Router} from "express"
import {signup, login,update,getUsers,getUser,deleteUser} from "../controllers/auth.js"
import {verifyToken,owner} from "../config/auth.js"

const router = Router()
router.post("/signup",signup)
router.post("/login",login)
router.put("/update",verifyToken,update)
router.get("/getusers",verifyToken,getUsers)
router.get("/user/:id",verifyToken,getUser)
router.delete("/delete/:id",verifyToken,owner,deleteUser)

export default router