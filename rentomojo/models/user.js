const mongoose=require("mongoose");
const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
      },
      phonenumber : {
        type: Number,
        trim:true,
        maxlength:10,
        unique:true
      },
      email: {
        type: String,
        trim: true,
        required: true,
        unique: true
      }
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("User", userSchema);