import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import globalRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();

const logger = morgan("dev");

app.set("view engine", "pug"); //view engine 설정
app.set("views", process.cwd() + "/src/views"); //views 폴더 경로
app.use(logger); //morgan
app.use(express.urlencoded({ extended: true })); //express가 form의 value들을 이해할 수 있도록 함.
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
