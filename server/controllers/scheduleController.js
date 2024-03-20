const db = require('../db');

// Create a new schedule
exports.createSchedule = (req, res) => {
  const { GroupID, ScheduleImage, UploadTime } = req.body;
  const sql = 'INSERT INTO Schedules (GroupID, ScheduleImage, UploadTime) VALUES (?, ?, ?)';
  db.query(sql, [GroupID, ScheduleImage, UploadTime], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(201).json({ message: 'Schedule created successfully', id: result.insertId });
  });
};

// Get all schedules
exports.getAllSchedules = (req, res) => {
  const sql = 'SELECT * FROM Schedules';
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json(data);
  });
};

// Get schedules by group ID
exports.getSchedulesByGroupID = (req, res) => {
  const { GroupID } = req.params;
  const sql = 'SELECT * FROM Schedules WHERE GroupID = ?';
  db.query(sql, [GroupID], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json(data);
  });
};

// Delete a schedule
exports.deleteSchedule = (req, res) => {
  const { ScheduleID } = req.params;
  const sql = 'DELETE FROM Schedules WHERE ScheduleID = ?';
  db.query(sql, [ScheduleID], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    return res.json({ message: 'Schedule deleted successfully' });
  });
};
