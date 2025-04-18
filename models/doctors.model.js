const mongoose = require("mongoose");

const DoctorsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        birthday: {
            type: String,
            required: true,
        },
        work_start_time: {
            type: String,
            required: true,
        },
        work_end_time: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Doctors", DoctorsSchema);