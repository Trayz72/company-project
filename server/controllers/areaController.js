const db = require('../db');

//insert the record in area_table
exports.createArea = (req, res) => {
  const sql = `INSERT INTO area_table (Pincode, Area_Name, City_Id) VALUES (?,?,?)`;

  const values = [req.body.Pincode, req.body.Area_Name, req.body.City_Id];

  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    } else {
      return res.json(data);
    }
  });
}

//display record of area_table
exports.getAllAreas = (req, res) => {
  const sql = `SELECT area_table.Pincode, area_table.Area_Name, city_table.City_Name FROM area_table JOIN city_table ON area_table.City_Id = city_table.City_Id`;
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    } else {
      return res.json(data);
    }
  });
}

//delete record of area_table
exports.deleteArea = (req, res) => {
  const sql = "DELETE FROM area_table WHERE Pincode = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) {
      res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
}

//get record of area_table with City_Id
exports.getAreas = (req, res) => {
  const sql = "SELECT * FROM area_table";
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err); 
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json(data);
  });
}

//get record of area from area_table from specific id
exports.getAreasRecord = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM area_table WHERE Pincode = ?";
  // console.log(id);
  db.query(sql, [id], (err, data) => {
    if (err) {
      res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
} 

//update area_table record based on unique pincode
exports.updateArea = (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE area_table SET Pincode = ?, Area_Name = ?, City_Id =? WHERE Pincode = ?`;

  const values = [req.body.Pincode, req.body.Area_Name, req.body.City_Id];

  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
}
