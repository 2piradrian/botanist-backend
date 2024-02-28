import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    posts: {
        type: [String],
        default: []
    },
    followers: {
        type: [String],
        default: []
    },
    following: {
        type: [String],
        default: []
    },
    likes: {
        type: [String],
        default: []
    }
});

export const UserModel = mongoose.model("User", userSchema);