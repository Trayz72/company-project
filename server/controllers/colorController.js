const db = require('../db');


//create color
exports.createColor= (req, res) => {
  const sql = "INSERT INTO color_table (Color_Name) VALUES (?)";
  const values = [req.body.Color_Name];

  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
}

//get all color
exports.getAllColors = (req, res) => {
  const sql = "SELECT * FROM color_table";
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err); 
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json(data);
  });
};

//delete color name
exports.deleteColorName = (req, res) => {
  const sql = "DELETE FROM color_table WHERE Color_Id = ?";
  const id = req.params.id;
  // console.log(id);
  db.query(sql, [id], (err, data) => {
    if (err) {
      res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
}

//update color name based on id
exports.updateColorName = (req, res) => {
  const sql = `UPDATE color_table SET Color_Name = ? WHERE Color_Id = ?`;

  const values = [req.body.Color_Name, req.params.id];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
}

//get a single ColorName record by id
exports.getColorRecord = (req, res) => {
  const sql = "SELECT * FROM color_table WHERE Color_Id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) {
      res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
};