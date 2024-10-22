import { Router } from "express"
import { deleteUser, signout, test, updateUser } from "../controllers/user.controller.js"
import verifyToken from "../middlewares/verify.js"

const router = Router()

router.route("/").get(test)
router.route("/update/:userId").put(verifyToken, updateUser)
router.route("/delete/:userId").delete(verifyToken, deleteUser)
router.route("/signout").post(signout)


export default router