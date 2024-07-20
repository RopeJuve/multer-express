import { pool } from "../db/db.js";

export const getImages = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM pictures");
    res.send(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
