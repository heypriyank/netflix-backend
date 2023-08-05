import mongoose from "mongoose";

const moviesSchema = mongoose.Schema(
  {
    "name": {
      type: String,
      ref: "user",
      required: true
    },
    "director": {
      type: String,
      required: true,
      maxLength: 1000,
      required: true
    },
    "99popularity": {
      type: Number,
      required: true,
      max: 99
    },
    "imdb_score": {
      type: Number,
      required: true,
      max: 10
    },
    "genre": {
      type: [String],
      default: [],
      required: true
    },
    "imageUrl": {
      type: String,
      maxLength: 1000,
    },
    "addedBy": {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    "isDeleted": {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("movies", moviesSchema);

export { Movie };
