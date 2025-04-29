require('dotenv').config();
const express = require('express');
const cors = require('cors');
const client = require('./db');  // Import DB Client

const app = express();
app.use(express.json());
app.use(cors());

// Cassandra DB Connection & Table Creation
async function connectToCassandra() {
  try {
    await client.connect();
    console.log('✅ Connected to CassandraDB');

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS students (
        prn TEXT PRIMARY KEY,
        name TEXT,
        branch TEXT,
        mobile TEXT
      );
    `;
    await client.execute(createTableQuery);
    console.log("✅ Table 'students' created or already exists");
  } catch (err) {
    console.error('❌ Cassandra Connection Error:', err);
    process.exit(1);
  }
}

connectToCassandra();

// Import Routes
const studentRoutes = require('./routes/studentRoutes');
app.use('/api', studentRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
