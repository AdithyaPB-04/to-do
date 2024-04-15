import { userRegistration,userLogin } from "./userController";
import Router from "express";

const router  = Router();

router.post('/register',userRegistration);
router.get('/login',userLogin);

export default router;