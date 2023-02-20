import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";

const app = express();

const logger = morgan("dev");

app.set("view engine", "pug"); //view engine 설정
app.set("views", process.cwd() + "/src/views"); //views 폴더 경로

app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.use(logger); //morgan
app.use(express.urlencoded({ extended: true })); //express가 form의 value들을 이해할 수 있도록 함.
// app.use(express.text()); express에 내장된 미들웨어 기능으로 body-parser를 기반으로 request payload로 전달한 문자열을 파싱
app.use(express.json());

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

app.use(flash()); //session에 연결해서 사용자에게 메시지를 남긴다.
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);

export default app;
