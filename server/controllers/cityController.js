const db = require('../db');

exports.getAllCities = (req, res) => {
  const sql = `SELECT city_table.City_Id, city_table.City_Name, state_table.state_name FROM city_table JOIN state_table ON city_table.State_Id = state_table.stateId`;
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    } else {
      return res.json(data);
    }
  });
}

exports.createCity = (req, res) => {
  const sql = `INSERT INTO city_table (City_Name, State_Id) VALUES (?,?)`;

  const values = [req.body.City_Name, req.body.State_Id];

  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    } else {
      return res.json(data);
    }
  });
}

exports.deleteCity = (req, res) => {
  const sql = "DELETE FROM city_table WHERE City_Id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) {
      res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
}

exports.updateCity = (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE city_table SET City_Name = ?, State_Id = ? WHERE City_Id = ?`;

  const values = [req.body.City_Name, req.body.State_Id];

  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
}

exports.getCitiesRecord = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM city_table WHERE City_Id = ?";
  // console.log(id);
  db.query(sql, [id], (err, data) => {
    if (err) {
      res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
} 

exports.getCities = (req, res) => {
  const sql = "SELECT * FROM city_table";
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err); 
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json(data);
  });
}