import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: 50,
    },
});

const Genre = mongoose.model("genre", genreSchema);

export { Genre };
