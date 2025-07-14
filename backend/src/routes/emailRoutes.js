import { Router } from "express";
import generateEmail from "../controllers/EmailGen.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.post('/generateemail', auth, generateEmail);


export default router;
