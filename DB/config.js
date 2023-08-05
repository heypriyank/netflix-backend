import mongoose from "mongoose";
import "dotenv/config";
const uri = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            poolSize: 100,
        });

        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;
