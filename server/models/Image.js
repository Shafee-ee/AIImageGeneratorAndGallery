import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
    {
        prompt: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
);


const Image = mongoose.model("Image", imageSchema);

export default Image;