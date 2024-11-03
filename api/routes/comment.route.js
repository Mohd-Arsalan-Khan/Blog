import { Router } from "express";
import verifyToken from "../middlewares/verify.js";
import { createComment } from "../controllers/comment.controller.js";

const router = Router()

router.route('/create').post(verifyToken, createComment)

export default router