const { profile } = require("console")
const { request } = require("http")
const mongoose =require("mongoose")
const { type } = require("os")
const { CgPassword } = require("react-icons/cg")


const userSchema = new mongoose.Schema({

    username:{
         type:String,
         unique: [true,"user name already exists"],
         require :[true, "user name is required"]

    },
    email:{
        type:String,
        unique:[true, "user emai already exists"],
        require:[true,"email  is required"],
    },
    password:{
        type:String,
        require:[true, "password is required"],

    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/fau0arp6i/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.webp?updatedAt=1771157172981"
    }



})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel;