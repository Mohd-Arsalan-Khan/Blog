import { Router } from "express";
import verifyToken from "../middlewares/verify.js";
import { create, getPosts } from "../controllers/post.controller.js";


const router = Router()


router.route("/create").post(verifyToken, create)
router.route("/getposts").get(getPosts)


export default router