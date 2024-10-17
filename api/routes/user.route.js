import { Router } from "express"
import { test, updateUser } from "../controllers/user.controller.js"
import verifyToken from "../middlewares/verify.js"

const router = Router()

router.route("/").get(test)
router.route("/update/:userId").put(verifyToken, updateUser)



export default router