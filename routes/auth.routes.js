const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// router.post("/register", async (req, res) => {
//   const { username, password } = req.body;
//   const hash = await bcrypt.hash(password, 10);
//   const user = new User({ username, password: hash });
//   await user.save();

//   res.json({ pesan: "pengguna berhasil dibuat" });
// });

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ pesan: "pengguna tidak di temukan" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ pesan: "password salah" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json(token);
});

module.exports = router;
