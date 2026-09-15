const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
const Roadmap = require("./models/Roadmap");

const app = express();

app.use(cors());
app.use(express.json());


/* ================= MONGODB CONNECTION ================= */

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully ✅");
    })
    .catch((error) => {
        console.log("MongoDB connection failed ❌");
        console.log(error.message);
    });


/* ================= HOME ================= */

app.get("/", (req, res) => {

    res.json({
        message: "GrowPath backend is running 🚀"
    });

});


/* ================= CAREER SETUP ================= */

app.post("/api/career-setup", async (req, res) => {

    try {

        const {
            careerGoal,
            level,
            target
        } = req.body;


        const newUser = new User({

            careerGoal: careerGoal,

            level: level,

            target: target

        });


        const savedUser =
            await newUser.save();


        console.log(
            "Career Setup Saved ✅"
        );


        console.log(
            "Career Goal:",
            savedUser.careerGoal
        );


        console.log(
            "Level:",
            savedUser.level
        );


        console.log(
            "Target:",
            savedUser.target
        );


        res.json({

            message:
                "Career setup saved successfully!",

            user:
                savedUser

        });


    } catch (error) {

        console.error(
            "Error saving user:",
            error.message
        );


        res.status(500).json({

            message:
                "Failed to save career setup"

        });

    }

});


/* ================= CREATE ROADMAP ================= */

app.post("/api/roadmap", async (req, res) => {

    try {

        const {
            userId,
            careerGoal,
            level,
            target,
            skills
        } = req.body;


        const newRoadmap = new Roadmap({

            userId,

            careerGoal,

            level,

            target,

            skills

        });


        const savedRoadmap =
            await newRoadmap.save();


        console.log(
            "Roadmap Saved ✅"
        );


        res.json({

            message:
                "Roadmap saved successfully!",

            roadmap:
                savedRoadmap

        });


    } catch (error) {

        console.error(
            "Error saving roadmap:",
            error.message
        );


        res.status(500).json({

            message:
                "Failed to save roadmap"

        });

    }

});


/* ================= GET ROADMAP ================= */

app.get("/api/roadmap/:userId", async (req, res) => {

    try {

        const roadmap =
            await Roadmap.findOne({

                userId:
                    req.params.userId

            });


        if (!roadmap) {

            return res.status(404).json({

                message:
                    "Roadmap not found"

            });

        }


        res.json({

            roadmap:
                roadmap

        });


    } catch (error) {

        console.error(
            "Error getting roadmap:",
            error.message
        );


        res.status(500).json({

            message:
                "Failed to get roadmap"

        });

    }

});


/* ================= MARK SKILL COMPLETE ================= */

app.put(
    "/api/roadmap/:roadmapId/skill/:skillId",
    async (req, res) => {

        try {

            const {
                completed
            } = req.body;


            const roadmap =
                await Roadmap.findById(
                    req.params.roadmapId
                );


            if (!roadmap) {

                return res.status(404).json({

                    message:
                        "Roadmap not found"

                });

            }


            const skill =
                roadmap.skills.id(
                    req.params.skillId
                );


            if (!skill) {

                return res.status(404).json({

                    message:
                        "Skill not found"

                });

            }


            skill.completed =
                completed;


            await roadmap.save();


            console.log(
                "Skill progress updated ✅"
            );


            res.json({

                message:
                    "Skill progress updated successfully!",

                roadmap:
                    roadmap

            });


        } catch (error) {

            console.error(
                "Error updating skill:",
                error.message
            );


            res.status(500).json({

                message:
                    "Failed to update skill"

            });

        }

    }
);


/* ================= START SERVER ================= */

const PORT = 5000;

app.listen(PORT, () => {

    console.log(
        `GrowPath server running on http://localhost:${PORT}`
    );

});