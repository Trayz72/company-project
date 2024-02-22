const db = require('../db');

//create product type name
exports.createProductType= (req, res) => {
  const sql = "INSERT INTO producttype (Product_Type_Name) VALUES (?)";
  const values = [req.body.Product_Type_Name];

  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
}

//get all product type id and name
exports.getAllProductType = (req, res) => {
  const sql = "SELECT * FROM producttype";
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err); 
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json(data);
  });
};

//delete product type 
exports.deleteProductType = (req, res) => {
  const sql = "DELETE FROM producttype WHERE Product_Type_Id = ?";
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

//update product type name based on id
exports.updateProductType = (req, res) => {
  const sql = `UPDATE producttype SET Product_Type_Name = ? WHERE Product_Type_Id = ?`;

  const values = [req.body.Product_Type_Name, req.params.id];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
}

//get a single productTypeName record by id
exports.getProductTypeRecord = (req, res) => {
  const sql = "SELECT * FROM producttype WHERE Product_Type_Id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) {
      res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
};