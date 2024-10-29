import { Router } from "express";
import verifyToken from "../middlewares/verify.js";
import { create, deletePost, getPosts } from "../controllers/post.controller.js";


const router = Router()


router.route("/create").post(verifyToken, create)
router.route("/getposts").get(getPosts)
router.route("/deletepost/:postId/:userId").delete(verifyToken, deletePost)


export default router