const db = require('../db');

//create product-category 
exports.createProductCategory= (req, res) => {
  const sql = "INSERT INTO product_category (Product_Category_Name) VALUES (?)";
  const values = [req.body.Product_Category_Name];

  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
}

//get all product-category
exports.getAllProductCategory = (req, res) => {
  const sql = "SELECT * FROM product_category";
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err); 
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json(data);
  });
};

//delete product category
exports.deleteProductCategory = (req, res) => {
  const sql = "DELETE FROM product_category WHERE Product_Category_Id = ?";
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

//update product category name based on id
exports.updateProductCategory = (req, res) => {
  const sql = `UPDATE product_category SET Product_Category_Name = ? WHERE Product_Category_Id = ?`;

  const values = [req.body.Product_Category_Name, req.params.id];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
}

//get a single productCategoryName record by id
exports.getProductCategoryRecord = (req, res) => {
  const sql = "SELECT * FROM product_category WHERE Product_Category_Id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) {
      res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
};