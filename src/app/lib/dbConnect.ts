import mongoose from "mongoose";

let isConnected: boolean = false;

async function dbConnect() {
  
  if (isConnected) return;
  
  try{
      const connect = await mongoose.connect(process.env.DB_CONNECTION_STRING!);
      isConnected = true;
      console.log("connected to db with db strings : " + {connect})
      // console.log("connected to db somehow");
  }
  catch(err){
    console.log("error connecting to db: " + err)
  }
}

export default dbConnect;
