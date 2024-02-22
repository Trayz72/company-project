const db = require('../db');

//create product weight
exports.createProductWeight= (req, res) => {
  const sql = "INSERT INTO product_weight (Product_Weight) VALUES (?)";
  const values = [req.body.Product_Weight];

  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
}

//get all product weight
exports.getAllProductWeight = (req, res) => {
  const sql = "SELECT * FROM product_weight";
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err); 
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json(data);
  });
};

//delete product weight
exports.deleteProductWeight = (req, res) => {
  const sql = "DELETE FROM product_weight WHERE Product_Weight_Id = ?";
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

//update product weight based on id
exports.updateProductWeight= (req, res) => {
  const sql = `UPDATE product_weight SET Product_Weight = ? WHERE Product_Weight_Id = ?`;

  const values = [req.body.Product_Weight, req.params.id];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
}

//get a single product-weight record by id
exports.getProductWeightRecord = (req, res) => {
  const sql = "SELECT * FROM product_weight WHERE Product_Weight_Id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) {
      res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
};