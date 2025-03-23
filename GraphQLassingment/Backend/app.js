
import express from "express";
import helmet from "helmet";
import server from "./graphql/graphql.js";
import { expressMiddleware } from "@apollo/server/express4";
import cors from 'cors';
import { errorMiddleware } from "./middlewares/error.js"
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

dotenv.config({ path: './.env', });

export const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
const port = process.env.PORT;

const mongoURI = process.env.MONGO_URI;

connectDB(mongoURI);

const app = express();
app.use(cors({ origin: ' * ', credentials: true }));


await server.start().then(() => {
  console.log(`🚀  Server ready`);
}).catch(e => console.log(e));


app.use(
  helmet({
    contentSecurityPolicy: envMode !== "DEVELOPMENT",
    crossOriginEmbedderPolicy: envMode !== "DEVELOPMENT",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/graphql", expressMiddleware(server));



app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

app.use(errorMiddleware);

app.listen(port, () => console.log('Server is working on Port:' + port + ' in ' + envMode + ' Mode.'));
