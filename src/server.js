import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

const app = express();

const logger = morgan("dev");

app.set("view engine", "pug"); //view engine 설정
app.set("views", process.cwd() + "/src/views"); //views 폴더 경로
app.use(logger); //morgan
app.use(express.urlencoded({ extended: true })); //express가 form의 value들을 이해할 수 있도록 함.

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false, //로그인한 사용자만 쿠키 정보 저장
    /*cookie: {
      maxAge: 10000, //세션 정보 유지 시간
    },*/
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
