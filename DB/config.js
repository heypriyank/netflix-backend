import mongoose from "mongoose";
const uri = 'mongodb+srv://test:GfMJsD3n6tXHup8K@cluster0.fzrpxas.mongodb.net/?retryWrites=true&w=majority'

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