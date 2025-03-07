import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import imageRoutes from "./routes/imageRoutes.js";


dotenv.config();//Loading environment variables

const app = express();


//middleWare

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }))

app.use("/api/images", imageRoutes);

const PORT = process.env.PORT || 5000;// setting PORT


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));

app.get("/", (req, res) => {
    res.send("AI image generator server is running")
}
);

app.listen(
    PORT, () => { console.log(`Server is running on PORT ${PORT}`) }
);