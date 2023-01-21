import express from "express";
import morgan from "morgan";

const PORT = 4000;
const app = express();

const loggerMiddleware = morgan("dev");

const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if (url === "/protected") {
    return res.send("<h1>Not Allowed</h1>");
  }
  console.log("Allowed, you mat continue.");
  next();
};

const handleHome = (req, res) => {
  return res.send("I love middlewares");
};

const handleLogin = (req, res) => {
  return res.send("Login here");
};

const handleProtected = (req, res) => {
  return res.send("Welcome to the private lounge.");
};

app.use(loggerMiddleware); //morgan
app.use(privateMiddleware);
app.get("/", handleHome);
app.get("/protected", handleProtected);
app.get("/login", handleLogin);

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
