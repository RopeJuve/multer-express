import { pool } from "../db/db.js";

export const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("Please upload a file");
  }
  const { originalname } = req.file;
  const filePath = `/uploads/${req.file.filename}`;
  try {
    const { rows } = await pool.query(
      "INSERT INTO pictures (name, path) VALUES ($1, $2) RETURNING *",
      [originalname, filePath]
    );
    console.log(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }

  res.send(`<div><h2>Here's the picture:</h2><img src="${filePath}"/></div>`);
};

export const uploadMultipleFiles = async (req, res) => {
  if (!req.files) {
    return res.status(400).send("Please upload a file");
  }
  try {
    const queries = req.files.map((file) => {
      const query = {
        text: "INSERT INTO pictures (name, path) VALUES ($1, $2) RETURNING *",
        values: [file.originalname, `/uploads/${file.filename}`],
      };
      return pool.query(query);
    });

    const results = await Promise.all(queries);
    console.log(results.map((result) => result.rows));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
  const files = req.files.map((file) => {
    return `<img src="/uploads/${file.filename}" />`;
  });
  res.send(`<div><h2>Here are the pictures:</h2>${files.join("")}</div>`);
};
