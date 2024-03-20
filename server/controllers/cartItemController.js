const db = require('../db');

exports.createCartItem = (req, res) => {
  const sql = `INSERT into cartitem (ProductId, quantity, totalPrice)
  VALUES(?,?,?)`;

  const values = [
    req.body.ProductId,
    req.body.quantity,
    req.body.totalPrice
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      res.status(500).json({ Error: "Error" });
    } else {
      return res.json(data);
    }
  });
}

exports.getAllCartItem = (req, res) => {
  const sql = `SELECT 
                  p.Image,
                  p.ProductName,
                  p.ProductPrice,
                  c.quantity,
                  c.totalPrice,
                  c.cartItemId
                FROM 
                  cartitem c
                LEFT JOIN products p ON c.ProductId = p.ProductId

  `;

  db.query(sql, (err, data) => {
    if (err) {
      res.status(500).json({ Error: "Error" });
    } else {
      if (data && data.length > 0) {
        // Set Cache-Control headers to prevent caching
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.json(data); 
      } else {
        res.status(404).json({ Error: "No cartItem found" });
      }
    }
  });
}


exports.deleteCartItem = (req, res) => {
  const sql = ` DELETE FROM cartitem where cartItemId = ?`;
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

exports.getAllCartItemQuantity = (req, res) => {
  const sql = `SELECT SUM(quantity) AS totalQuantity FROM cartitem;
  `;

  db.query(sql, (err, data) => {
    if (err) {
      res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
}

exports.getSumOfProductPrice = (req, res) => {
  const sql = `SELECT SUM(totalPrice) AS totalPrice FROM cartitem;`;

  db.query(sql, (err, data) => {
    if (err) {
      res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
}