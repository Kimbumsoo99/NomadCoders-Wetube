import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 }, //얘랑 {type: String} 은 동일하다.
  description: { type: String, required: true, trim: true, minLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now }, //()를 쓰면안된다. Date.now에서
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

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
