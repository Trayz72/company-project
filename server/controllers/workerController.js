const db = require('../db');

// Create a new worker
exports.createWorker = (req, res) => {
  const { WorkerName, Address, Email, Password, Contact, WorkID } = req.body;
  const sql = 'INSERT INTO Workers (WorkerName, Address, Email, Password, Contact, WorkID) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [WorkerName, Address, Email, Password, Contact, WorkID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(201).json({ message: 'Worker created successfully', id: result.insertId });
  });
};

// Get all workers
exports.getAllWorkers = (req, res) => {
  const sql = 'SELECT Workers.WorkerID, Workers.WorkerName, Workers.Email, Workers.Contact, Works.WorkName  FROM Workers JOIN Works ON Workers.WorkID = Works.WorkID';
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json(data);
  });
};

// Get a single worker by ID
exports.getWorkerById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM Workers WHERE WorkerID = ?';
  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    return res.json(data[0]);
  });
};

exports.updateWorker = (req, res) => {
  const { id } = req.params;
  const { WorkerName, Address, Email, Password, Contact, WorkID } = req.body;
  const sql = 'UPDATE Workers SET WorkerName = ?, Address = ?, Email = ?, Password = ?, Contact = ?, WorkID = ? WHERE WorkerID = ?';
  db.query(sql, [WorkerName, Address, Email, Password, Contact, WorkID, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    return res.json({ message: 'Worker updated successfully' });
  });
};


// Delete a worker by ID
exports.deleteWorker = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Workers WHERE WorkerID = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    return res.json({ message: 'Worker deleted successfully' });
  });
};
