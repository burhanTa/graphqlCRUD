import { IBlog } from './../types/IUsers.d';
import { mongoose } from "./../db.js";
const BlogSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  title: {
    type: String,
    required:true
  },
  description: {
    type: String,
    required:true
  },
});

export const MBlog = mongoose.model<IBlog>("blogs", BlogSchema);
