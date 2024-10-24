import { Router } from "express";
import verifyToken from "../middlewares/verify.js";
import { create } from "../controllers/post.controller.js";


const router = Router()


router.route("/create").post(verifyToken, create)


export default router