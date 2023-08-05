import mongoose from "mongoose";

const logSchema = mongoose.Schema(
  {
    "doneBy": {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    "doneOn": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movies",
    },
    "prevData": {
        type: Object
    },
    "newData": {
        type: Object
    }
  },
  {
    timestamps: true,
  }
);

const Logs = mongoose.model("changelogs", logSchema);

export { Logs };
