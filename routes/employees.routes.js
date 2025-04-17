const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Employees = require("../models/employees.model");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const employees = await Employees.find();
  res.json(employees);
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
    user :  req.user.id,
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

module.exports = router;
