import { listCreation,listUpdate,listDelete,getAll } from "./listController";
import Router from "express";
import { userValidation} from "../admin/authentication";

const router = Router();

router.use(userValidation)
router.post('/listcreate',listCreation);
router.put('/:id',listUpdate);
router.delete('/:id',listDelete);
router.get('/all',getAll);

export default router;