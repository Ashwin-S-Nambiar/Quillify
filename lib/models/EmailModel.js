import mongoose from "mongoose";

// Email Schema for the MongoDB database
const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now 
    }
});

// Creating a model with the database schema if it does not exist
const EmailModel = mongoose.models.email || mongoose.model('email', emailSchema);

export default EmailModel;
