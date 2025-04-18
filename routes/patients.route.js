const express = require("express");
const router = express.Router();
const Patients = require("../models/patients.model");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const { id, name } = req.query;
    if (id) {
      const patient = await Patients.findById(id);
      if (!patient) {
        return res.status(404).json({ message: "ID Patient not found" });
      }
      return res.json(patient);
    }
    if (name) {
      const patient = await Patients.findOne({ name: name });
      if (!patient) {
        return res.status(404).json({ message: "Name Patient not found" });
      }
      return res.json(patient);
    }
    const patients = await Patients.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", auth, async (req, res) => {
  const { name, gender, birthday, no_ktp, address } = req.body;
  const newPatient = new Patients({
    name,
    gender,
    birthday,
    no_ktp,
    address,
    user: req.user.id,
  });
  const patientSaved = newPatient.save();
  res.json(patientSaved);
});

router.put("/:id", auth, async (req, res) => {
  const patientUpdated = await Patients.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(patientUpdated);
});

router.delete("/:id", auth, async (req, res) => {
  await Patients.findByIdAndDelete(req.params.id);
  res.json({ message: "patient deleted" });
});

module.exports = router;
