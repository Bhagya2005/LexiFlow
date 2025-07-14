import mongoose from "mongoose";

const connectDb = async () => {
    try {
        // Add connection options for better reliability
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 15000, // Increase timeout to 15 seconds
            socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
        };
        
        const connectionResponse = await mongoose.connect(
            `${process.env.MONGODB_URI}/Ai-Blog-Generation`,
            options
        );
        
        console.log(`\n MongoDB connected !! DB Host: ${connectionResponse.connection.host}`);
        
    } catch (error) {
        console.log("MongoDB Connection Error:", error);
        process.exit(1);
    }
}

export default connectDb;