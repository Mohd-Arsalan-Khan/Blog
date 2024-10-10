import { Router } from "express"
import { test } from "../controllers/user.controller.js"
import { google } from "../controllers/auth.controller.js"

const router = Router()

router.route("/").get(test)
// router.route("/google").post(google)


export default router