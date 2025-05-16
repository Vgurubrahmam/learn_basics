const express = require('express');
const { Pool } = require('pg');
const bcrypt = require("bcrypt");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const secretkey = "guru";

// DB connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "guru",
  port: 5432,
});

pool.connect()
  .then((client) => {
    console.log("Database connected");
    client.release();
  })
  .catch((error) => {
    console.log("Database connection error", error);
  });

// ✅ Create Students Table
app.get("/createstudenttable", async (req, res) => {
  const createQuery = `
    CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        schoolName VARCHAR(255),
        class VARCHAR(10),
        section VARCHAR(10),
        studentName VARCHAR(255),
        rollNumber INTEGER
    );
  `;
  try {
    await pool.query(createQuery);
    console.log("Students table created successfully")
    res.status(200).send({ message: "Students table created successfully" });
  } catch (error) {
    console.error("Table creation error:", error);
    res.status(500).send({ message: "Error creating students table", error });
  }
});

// ✅ Get All Students
app.get("/students", async (req, res) => {
    console.log("called");
    
  try {
    const result = await pool.query("SELECT * FROM students ORDER BY id");
    res.status(200).json({ message: "Students fetched successfully", data: result.rows });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students", error });
  }
});

app.listen(8000, () => {
  console.log("Server is running at http://localhost:8000");
});
