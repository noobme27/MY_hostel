import express from "express";
import cors from "cors";
import layoutRoute from "./routes/hosteLayout.route.js";
import authRoute from "./routes/auth.route.js";
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use("/api/room-layout", layoutRoute);
app.use("/api/auth", authRoute);

app.listen(8800, () => {
  console.log("Server is running on port 8800!");
});
