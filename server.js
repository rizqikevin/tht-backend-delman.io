const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/auth.routes");
const employeRoutes = require("./routes/employees.routes");
const doctorRoutes = require("./routes/doctors.route");
const patientRoutes = require("./routes/patients.route");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server berjalan di http://localhost:5000`);
    });
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("API sudah berjalan");
});
