import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String, //얘랑 {type: String} 은 동일하다.
  description: String,
  createdAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
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
