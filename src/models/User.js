import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

userSchema.pre("save", async function () {
  //비밀번호가 수정될때만 미들웨어 동작
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5); //await을 쓰고있어서 콜백 필요없음
  }
});

const User = mongoose.model("User", userSchema);
export default User;
