const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  follower: {
     type:String,
    
    required: [true, "follower id is required"],
  },
  followee: {
    type:String,
    required: [true, "followee id is required"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  
});
followSchema.index({follower:1,followee:1},{unique:true});
const followModel = mongoose.model("follows", followSchema);

module.exports = followModel;
