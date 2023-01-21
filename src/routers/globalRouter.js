import express from "express";
import { join } from "../controllers/userController";
import { trending, watch, edit } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", trending);
globalRouter.get("/join", join);
export default globalRouter;
