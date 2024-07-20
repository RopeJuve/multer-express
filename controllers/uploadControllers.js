import { pool } from "../db/db.js";

export const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("Please upload a file");
  }
  const { originalname } = req.file;
  const filePath = `public/uploads/${req.file.filename}`;
  try {
    const { rows } = await pool.query(
      "INSERT INTO pictures (name, path) VALUES ($1, $2) RETURNING *",
      [originalname, filePath]
    );
    res.json({ message: "File uploaded successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const uploadMultipleFiles = async (req, res) => {
  if (!req.files) {
    return res.status(400).send("Please upload a file");
  }
  try {
    const queries = req.files.map((file) => {
      const query = {
        text: "INSERT INTO pictures (name, path) VALUES ($1, $2) RETURNING *",
        values: [file.originalname, `public/uploads/${file.filename}`],
      };
      return pool.query(query);
    });

    const results = await Promise.all(queries);
    res.json({ message: "Files uploaded successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
