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

const uploadService = multer({
  storage: storage
}) 

//insert the record in service-table
const createService = (req, res) => {
  const sql = `INSERT INTO service (ServiceName, ServiceDescription, CostPerHour, ProductDimension, Image) VALUES (?,?,?,?,?)`;
  // console.log(req.body);
  // console.log(req.file);
  const values = [ 
    req.body.ServiceName, 
    req.body.ServiceDescription,
    req.body.CostPerHour,
    req.body.ProductDimension,
    req.file.filename
  ];

  // console.log("Executing SQL query:", sql);
  // console.log("Query values:", values);

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.json({ Error: "Error" });
    } else {
      console.log("Insert successful:", data);
      return res.json(data);
    }
  });
}

const getAllServices = (req, res) => {

  const sql = "SELECT * from service";
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ Error: "Error" });
    } else {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      return res.json(data);
    }
  });
}

//delete service
const deleteService = (req, res) => {
  const sql = ` DELETE FROM service where ServiceId = ?`;
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

// getService by id
const getServiceById = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM service WHERE ServiceId = ?";
  // console.log(id);
  db.query(sql, [id], (err, data) => {
    if (err) {
      res.json({ Error: "Error" });
    } else {
      res.json(data);
    }
  });
}

const updateService = (req, res)=> {
  const id = req.params.id;
  const sql = `UPDATE service SET ServiceName = ?, ServiceDescription = ?, CostPerHour =?, ProductDimension = ?${req.file ? ', Image = ?' : ''} WHERE ServiceId = ?`;
  // console.log(id)
  // console.log(sql)
  const values = [
    req.body.ServiceName, 
    req.body.ServiceDescription,
    req.body.CostPerHour,
    req.body.ProductDimension,
    ...(req.file ? [req.file.filename] : [])
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
  uploadService,
  createService,
  getAllServices,
  deleteService,
  getServiceById,
  updateService
};