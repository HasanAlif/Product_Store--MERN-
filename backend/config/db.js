import  mongoose  from "mongoose";

export const connectDB = async () => {// Function to connect to the MongoDB database
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);// Connect to the database using the URI from environment variables
    console.log(`MongoDB Connected: ${conn.connection.host}`);// Log the host of the connected database
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);// Exit the process with failure if the connection fails
  }
}