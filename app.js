import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { upload } from "./multer/multer.js";
import path from "path";
import {
  uploadFile,
  uploadMultipleFiles,
} from "./controllers/uploadControllers.js";
import { getImages } from "./controllers/imagesController.js";
import viewsRouter from "./routes/viewsRouter.js";

const app = express();
const __dirname = path.resolve();
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get("/", viewsRouter);

app.post("/upload-profile-pic", upload.single("profile_pic"), uploadFile);

app.post("/upload-cat-pics", upload.array("cat_pics", 5), uploadMultipleFiles);

app.get("/get-pictures", getImages);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
