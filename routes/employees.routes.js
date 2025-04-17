const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Employees = require("../models/employees.model");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const { id, name } = req.query;
    if (id) {
      const employees = await Employees.findById(id);
      if (!employees) {
        return res.status(404).json({ message: "Not Found" });
      }
      return res.json(employees);
    }

    if (name) {
      const employees = await Employees.findOne({ name: name });
      if (!employees) {
        return res.status(404).json({ message: "Not Found" });
      }
      return res.json(employees);
    }

    const allEmployees = await Employees.find();
    res.json(allEmployees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", auth, async (req, res) => {
  const { name, username, password, gender, birthday } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const newEmployees = new Employees({
    name,
    username,
    password: hash,
    gender,
    birthday,
    user: req.user.id,
  });
  const savedEmployees = await newEmployees.save();
  res.json({ savedEmployees });
});

router.put("/:id", auth, async (req, res) => {
  const employeesUpdate = await Employees.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(employeesUpdate);
});

router.delete("/:name", auth, async (req, res) => {
  await Employees.findOneAndDelete(req.params.name);
  res.json({ message: "employe deleted" });
});

router.delete("/:id", auth, async (req, res) => {
  await Employees.findByIdAndDelete(req.params.id);
  res.json({ message: "employe deleted" });
});

module.exports = router;
