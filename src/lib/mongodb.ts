import mongoose from "mongoose";


export const connectMongo = async () =>{
    try{
        const url = process.env.MONGO_URI as string; 
        await mongoose.connect(url);
        console.log("Connected To MongoDb");
    }
    
    catch(e:any){
        console.log("Error connecting to MongoDB: ", e);
        throw new Error(e.message);
    }
}