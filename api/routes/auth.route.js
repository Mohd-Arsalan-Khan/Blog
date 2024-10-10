import { Router} from "express";
import { google, signUp, signIn } from "../controllers/auth.controller.js";



const router = Router();


router.route("/").post(signUp)
router.route("/signin").post(signIn)
router.route("/google").post(google)



export default router