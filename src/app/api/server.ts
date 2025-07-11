
import express from 'express';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();
// Get the current directory (workaround for __dirname)
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
app.use(express.json());
app.use(
  "/public/uploads",
  express.static(join(__dirname, "public", "uploads"))
);

mongoose
  .connect(process.env.DB_CONNECTION_STRING!)
  .then(() => {
    console.log("succesfully connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/api', userRoutes);
app.listen(5000, () => console.log('Server running on port 5000'));
