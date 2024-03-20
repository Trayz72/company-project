const db = require('../db');

// Create a new worker service assignment
exports.createWorkerServiceAssignment = (req, res) => {
  const { ServiceRequestId, WorkerId, AssignedDate } = req.body;
  const sql = 'INSERT INTO WorkerServiceAssignment (ServiceRequestId, WorkerId, AssignedDate) VALUES (?, ?, ?)';
  db.query(sql, [ServiceRequestId, WorkerId, AssignedDate], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(201).json({ message: 'Worker service assignment created successfully', id: result.insertId });
  });
};

// Get all worker service assignments
exports.getAllWorkerServiceAssignments = (req, res) => {
  const sql = 'SELECT * FROM WorkerServiceAssignment';
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json(data);
  });
};

// Get a single worker service assignment by ID
exports.getWorkerServiceAssignmentById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM WorkerServiceAssignment WHERE AssignmentId = ?';
  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: 'Worker service assignment not found' });
    }
    return res.json(data[0]);
  });
};

exports.getAssignedWork = (req, res) => {
  const { workerId } = req.params;
  const sql = 'SELECT * FROM WorkerServiceAssignment WHERE WorkerId = ?';
  db.query(sql, [workerId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json([data]); // Wrap the data in an array
  });
};

// Update a worker service assignment by ID
exports.updateWorkerServiceAssignment = (req, res) => {
  const { id } = req.params;
  const { ServiceRequestId, WorkerId, AssignedDate } = req.body;
  const sql = 'UPDATE WorkerServiceAssignment SET ServiceRequestId = ?, WorkerId = ?, AssignedDate = ? WHERE AssignmentId = ?';
  db.query(sql, [ServiceRequestId, WorkerId, AssignedDate, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Worker service assignment not found' });
    }
    return res.json({ message: 'Worker service assignment updated successfully' });
  });
};

// Delete a worker service assignment by ID
exports.deleteWorkerServiceAssignment = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM WorkerServiceAssignment WHERE AssignmentId = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Worker service assignment not found' });
    }
    return res.json({ message: 'Worker service assignment deleted successfully' });
  });
};
