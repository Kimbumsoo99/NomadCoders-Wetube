import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 }, //얘랑 {type: String} 은 동일하다.
  description: { type: String, required: true, trim: true, minLength: 10 },
  createdAt: { type: Date, required: true, default: Date.now }, //()를 쓰면안된다. Date.now에서
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

videoSchema.pre("save", async function () {
  this.hashtags = this.hashtags[0]
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

//미들웨어는 모델이 생성되기전에 만들어져야한다.
const Video = mongoose.model("Video", videoSchema);
export default Video;
/* 예시 DB 값
const video={
    title:"Heki",
    description:"lalalala",
    createdAt: 20221212,
    hashtags:[
        "#hi"
        "#mongo"
    ]
    meta:{
        views:30
        rating:4
    }
}
*/
