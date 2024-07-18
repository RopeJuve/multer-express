import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { upload } from "./multer/multer.js";
import path from "path";

const app = express();
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/upload-profile-pic", upload.single("profile_pic"), (req, res) => {
    if(!req.file){
        return res.status(400).send('Please upload a file');
    }
    const filePath = `/uploads/${req.file.filename}`;
  res.send(
    `<div><h2>Here's the picture:</h2><img src="${filePath}"/></div>`
  );
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
