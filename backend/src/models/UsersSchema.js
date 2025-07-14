import blog from "./BlogSchema.js";

import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    blogs: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog' 
    }]
  }
);

const user = mongoose.model("User", userSchema);
export default user;
