const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected!');
});

app.get('/', (req, res) => {
  res.send('Organ Donation System API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
