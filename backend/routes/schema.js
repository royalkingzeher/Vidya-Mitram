import mongoose from 'mongoose';

// Register Schema
const newuser = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensures no duplicate email registrations
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: { 
        type: String, 
        required: true 
    },
});


const register = mongoose.model('Register', newuser, 'Register');

export { register };
