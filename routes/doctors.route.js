const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Doctors = require("../models/doctors.model");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const { id, name } = req.query;
    if (id) {
      const doctor = await Doctors.findById(id);
      if (!doctor) {
        return res.status(404).json({ message: "Id Doctor not found" });
      }
      return res.json(doctor);
    }
    if (name) {
      const doctor = await Doctors.findOne({ name: name });
      if (!doctor) {
        return res.status(500).json({ message: "Name Doctor not found" });
      }
      return res.json(doctor);
    }

    const doctors = await Doctors.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", auth, async (req, res) => {
  const {
    name,
    username,
    password,
    gender,
    birthday,
    work_start_time,
    work_end_time,
  } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const newDoctor = new Doctors({
    name,
    username,
    password: hash,
    gender,
    birthday,
    work_start_time,
    work_end_time,
    user: req.user.id,
  });
  const doctorSaved = await newDoctor.save();
  res.json(doctorSaved);
});

router.put("/:id", auth, async (req, res) => {
  const doctorUpdate = await Doctors.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(doctorUpdate);
});

router.delete("/:id", auth, async (req, res) => {
  const doctorDelete = await Doctors.findByIdAndDelete(req.params.id);
  if (!doctorDelete) {
    return res.status(404).json({ message: "Doctor not Found" });
  }
  res.json({ message: "Doctor Deleted" });
});

module.exports = router;
