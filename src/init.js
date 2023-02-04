import "dotenv/config";
//require("dotenv").config(); //dotenv를 사용하고싶으면 모든 파일에 require를 사용
import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 4000;
const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
