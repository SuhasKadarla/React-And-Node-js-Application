 // server.js

const express = require('express');
const cors = require('cors');
const pg = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// PostgreSQL configuration
const pool = new pg.Pool({
  user: 'postgres',
  password: '1234',
  host: 'localhost',
  database: 'cus_database',
  port: 5432
});

// Routes
app.get('/customers', async (req, res) => {
  try {
    const { search, sortBy } = req.query;
    let query = 'SELECT * FROM customers';

    if (search) {
      query += ` WHERE customer_name ILIKE '%${search}%' OR location ILIKE '%${search}%'`;
    }

    if (sortBy) {
      query += ` ORDER BY ${sortBy === 'date' ? 'created_at::date' : 'created_at::time'}`;
    }

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

