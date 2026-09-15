const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    careerGoal: {
        type: String,
        required: true
    },

    level: {
        type: String,
        required: true
    },

    target: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);