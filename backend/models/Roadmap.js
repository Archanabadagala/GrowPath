const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

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
    },

    skills: [
        {
            name: String,
            description: String,
            completed: {
                type: Boolean,
                default: false
            }
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model("Roadmap", roadmapSchema);