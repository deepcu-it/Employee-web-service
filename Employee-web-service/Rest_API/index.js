import express from "express";
import connectDB from "./database.js";
import {app, router} from "./app.js";

connectDB();


app.use(express.json());
app.use('/api',router);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});