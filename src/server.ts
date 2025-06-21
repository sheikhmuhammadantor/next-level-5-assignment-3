import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";

dotenv.config();
app.use(cors());

const PORT = 5000;
const uri = process.env.MONGO_URI;

async function main() {
  try {
    await mongoose.connect(`${uri}`);
    console.log("✅ Connected to BookDB Using Mongoose !");

    app.listen(PORT, () => {
      console.log(`🎇 Book Is Reading on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(`Oops, ❌ Error Happen : \n ${error}`);
  }
}

main();
