import { Router } from "express";
import verifyToken from "../middlewares/verify.js";
import { createComment, getPostComment, likeComment } from "../controllers/comment.controller.js";

const router = Router()

router.route('/create').post(verifyToken, createComment)
router.route('/getpostcomments/:postId').get(getPostComment)
router.route('/likeComment/:commentId').put(verifyToken, likeComment)

export default router