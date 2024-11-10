import { Router } from "express";
import verifyToken from "../middlewares/verify.js";
import { createComment, deleteComment, editComment, getComments, getPostComment, likeComment } from "../controllers/comment.controller.js";

const router = Router()

router.route('/create').post(verifyToken, createComment)
router.route('/getpostcomments/:postId').get(getPostComment)
router.route('/likeComment/:commentId').put(verifyToken, likeComment)
router.route('/editComment/:commentId').put(verifyToken, editComment)
router.route('/deleteComment/:commentId').delete(verifyToken, deleteComment)
router.route('/getcomments').get(verifyToken, getComments)

export default router