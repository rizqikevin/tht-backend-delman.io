const express = require("express");
const router = express.Router();
const Employees = require("../models/employees.model");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const employees = await Employees.find();
  res.json(employees);
});

router.post("/", auth, async (req, res) => {
  const newEmployees = new Employees({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    gender: req.body.gender,
    birthday: req.body.birthday,
    user: req.user.id,
  });
  const savedEmployees = newEmployees.save();
  res.json(savedEmployees);
});

router.put("/:id", auth, async (req, res) => {
  const employeesUpdate = await Employees.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(employeesUpdate);
});