const mongoose = require("mongoose");

const AppointmentsSchema = new mongoose.Schema(
  {
    patient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctors",
      required: true,
    },
    datetime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["IN_QUEUE", "DONE", "CANCELED"],
      default: "IN_QUEUE",
    },
    diagnose: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointments", AppointmentsSchema);
