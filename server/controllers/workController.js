const db = require('../db');

// Create a new work
exports.createWork = (req, res) => {
  const { WorkName } = req.body;
  const sql = 'INSERT INTO Works (WorkName) VALUES (?)';
  db.query(sql, [WorkName], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(201).json({ message: 'Work created successfully', id: result.insertId });
  });
};

// Get all works
exports.getAllWorks = (req, res) => {
  const sql = 'SELECT * FROM Works';
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json(data);
  });
};

// Get a single work by ID
exports.getWorkById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM Works WHERE WorkID = ?';
  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: 'Work not found' });
    }
    return res.json(data[0]);
  });
};

// Update a work by ID
exports.updateWork = (req, res) => {
  const { id } = req.params;
  const { WorkName } = req.body;
  const sql = 'UPDATE Works SET WorkName = ? WHERE WorkID = ?';
  db.query(sql, [WorkName, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Work not found' });
    }
    return res.json({ message: 'Work updated successfully' });
  });
};

// Delete a work by ID
exports.deleteWork = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Works WHERE WorkID = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Work not found' });
    }
    return res.json({ message: 'Work deleted successfully' });
  });
};
