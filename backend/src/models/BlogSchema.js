import user from './UsersSchema.js';

import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 150,
    },
    content: {
        type: String,
        required: true,
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }

})

const blog  = mongoose.model("Blog", blogSchema)

export default blog