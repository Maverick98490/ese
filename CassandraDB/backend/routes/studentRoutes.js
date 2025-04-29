const express = require('express');
const client = require('../db');  // Use DB from db.js
const router = express.Router();

// Get All Students
// Get All Students
router.get('/students', async (req, res) => {
  try {
    const result = await client.execute('SELECT * FROM students;');
    console.log('Fetched Data:', result.rows); // Debug
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching students:', err);
    res.status(500).json({ success: false, error: 'Error fetching students' });
  }
});



// Add Student
router.post('/students', async (req, res) => {
  const { prn, name, branch, mobile } = req.body;
  try {
    await client.execute(
      'INSERT INTO students (prn, name, branch, mobile) VALUES (?, ?, ?, ?);',
      [prn, name, branch, mobile],
      { prepare: true }
    );
    res.json({ success: true, message: 'Student added successfully', student: req.body });
  } catch (err) {
    console.error('❌ Error adding student:', err);
    res.status(500).json({ success: false, error: 'Error adding student' });
  }
});

// Delete Student
router.delete('/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await client.execute('DELETE FROM students WHERE prn = ?;', [id], { prepare: true });
    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting student:', err);
    res.status(500).json({ success: false, error: 'Error deleting student' });
  }
});

module.exports = router;
