require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const incidentRoutes = require("./routes/incidentRoutes");
const routeRoutes = require("./routes/routeRoutes");
const guardianRoutes = require("./routes/guardianRoutes");
const userRoutes = require("./routes/userRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

const app = express();
connectDB(); 
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use("/api/incidents", incidentRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/guardian", guardianRoutes);
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.send("SafeRoute API Running");
});
app.use("/api/settings", settingsRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
