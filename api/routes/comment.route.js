import { Router } from "express";
import verifyToken from "../middlewares/verify.js";
import { createComment, getPostComment } from "../controllers/comment.controller.js";

const router = Router()

router.route('/create').post(verifyToken, createComment)
router.route('/getpostcomments/:postId').get(getPostComment)

export default router