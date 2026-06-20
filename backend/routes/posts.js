import { Router } from "express";
import { verifyToken,owner } from "../config/auth.js";
import {getAllPosts,getPost,createPost,updatePost,deletePost} from "../controllers/posts.js"

const router = Router();

router.get("/",getAllPosts)
router.get("/:id",getPost)
router.post("/create",verifyToken,createPost)
router.put("/update/:id",verifyToken,updatePost)
router.delete("/delete/:id",verifyToken,deletePost)

export default router;
