const express = require("express");
const router = express.Router();
const Appointments = require("../models/appointments.model");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const { id, name } = req.body;
    if (id) {
      const appointments = await Appointments.findById(id);
      if (!appointments) {
        return res.status(404).json({ message: "ID Patient not found" });
      }
      return res.json(appointments);
    }
    if (name) {
      const appointments = await Appointments.findOne({ name: name });
      if (!appointments) {
        return res.status(404).json({ message: "Name Patinet not found" });
      }
      return res.json(appointments);
    }
    const fullAppointments = await Appointments.find();
    res.json(fullAppointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

