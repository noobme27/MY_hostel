import express from "express";
import cors from "cors"; // Add this
import layoutRoute from "./routes/hosteLayout.route.js";
import authRoute from "./routes/auth.route.js";
const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());

app.use("/api/room-layout", layoutRoute);
app.use("/api/auth", authRoute);

app.listen(8800, () => {
  console.log("Server is running on port 8800!");
});
