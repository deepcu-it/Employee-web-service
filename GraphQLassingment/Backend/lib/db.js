    
  import mongoose from "mongoose";
  
  export const connectDB = (uri) =>
    mongoose
      .connect(uri)
      .then((c) => {
        console.log(`Connected with ${c.connection.host}`);
      })
      .catch((e) => console.log(e));
  
  