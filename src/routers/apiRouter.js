import express from "express";
import { createComment, registerView } from "../controllers/videoController";

const apiRouter = express.Router();

//localhost:4000/api/videos/124124312/view
apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);

export default apiRouter;
