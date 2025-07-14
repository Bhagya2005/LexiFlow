import mongoose from 'mongoose';

const emailSchema = mongoose.Schema({
  subject: {
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
});

const emailModel = mongoose.model("Email", emailSchema);
export default emailModel;
