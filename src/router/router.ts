import express from "express";
import user from "../modules/user/userRoute";
import list from "../modules/list/listRoute";

const Router = express.Router();

Router.use('/user',user);
Router.use('/list',list);

export default Router;