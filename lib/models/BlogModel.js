import mongoose from "mongoose";

//Blog Schema for the MongoDB database
const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    authorImg:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

// Creating a model with the database schema if it does not exist.
const BlogModel = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default BlogModel;