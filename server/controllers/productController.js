const db = require('../db');
const multer = require('multer');
const path = require('path');

//image upload 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Public/images');
  }, 
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
}) 


//insert the record in area_table
const createProduct = (req, res) => {
  const sql = `INSERT INTO products (ProductName, ProductDescription, ProductPrice, Product_Category_Id, Product_Type_Id, Product_Weight_Id, Color_Id, Image) VALUES (?,?,?,?,?,?,?,?)`;
  // console.log(req.body);
  // console.log(req.file);
  // const Image = req.file.filename;
  const values = [ 
    req.body.ProductName, 
    req.body.ProductDescription,
    req.body.ProductPrice,
    req.body.Product_Category_Id,
    req.body.Product_Type_Id,
    req.body.Product_Weight_Id,
    req.body.Color_Id,
    req.file.filename
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    } else {
      return res.json(data);
    }
  });
}

//display record of product_table
const getAllProduct = (req, res) => {
  
  const sql = `SELECT
                  p.ProductId,
                  p.ProductName,
                  p.ProductDescription,
                  p.ProductPrice,
                  pc.Product_Category_Name,
                  pt.Product_Type_Name,
                  pw.Product_Weight,
                  c.Color_Name,
                  p.Image
                FROM
                  products p
                LEFT JOIN product_category pc ON p.Product_Category_Id = pc.Product_Category_Id
                LEFT JOIN producttype pt ON p.Product_Type_Id = pt.Product_Type_Id
                LEFT JOIN product_weight pw ON p.Product_Weight_Id = pw.Product_Weight_Id
                LEFT JOIN color_table c ON p.Color_Id = c.Color_Id;
              `;

  // const sql = "SELECT * from products";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    } else {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      return res.json(data);
    }
  });
}

const deleteProduct = (req, res) => {
  const sql = ` DELETE FROM products where ProductId = ?`;
  const id = req.params.id;
  console.log(id);
  db.query(sql, [id], (err, data) => {
    if (err) {
      res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
}

//get record of product from product table from specific id
const getProductById = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM products WHERE ProductId = ?";
  // console.log(id);
  db.query(sql, [id], (err, data) => {
    if (err) {
      res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
}

//update products table record based on unique id
const updateProduct = (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE products SET ProductName = ?, ProductDescription = ?, ProductPrice =?, Product_Category_Id = ?, Product_Type_Id =?, Product_Weight_Id = ?, Color_Id = ?, Image = ? WHERE ProductId = ?`;

  const values = [
    req.body.ProductName, 
    req.body.ProductDescription,
    req.body.ProductPrice,
    req.body.Product_Category_Id,
    req.body.Product_Type_Id,
    req.body.Product_Weight_Id,
    req.body.Color_Id,
    req.file.filename
  ];

  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
}

module.exports = {
  upload,
  createProduct,
  getAllProduct,
  deleteProduct,
  getProductById,
  updateProduct,
};