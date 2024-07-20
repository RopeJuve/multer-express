import { pool } from "../db/db.js";

export const getImages = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM pictures");
    const images = rows.map((row) => {
      return `<div><h2>${row.name.split('.')[0]}</h2><a href="${row.path}"><img src="${row.path}" alt="image" /></a></div>`;
    });
    res.send(images.join(""));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
