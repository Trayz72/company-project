const express = require('express')
const cors = require('cors')
const adminController = require('./controllers/adminController');
const stateController = require('./controllers/stateController');
const cityController = require('./controllers/cityController');
const areaController = require('./controllers/areaController');
const pTypeController = require('./controllers/pTypeController');
const pCategoryController = require('./controllers/pCategoryController');
const pWeightController = require('./controllers/pWeightController');
const colorController = require('./controllers/colorController');
const {upload,createProduct,getAllProduct,deleteProduct,getProductById,updateProduct,getProductDetailById} = require('./controllers/productController');
const adminLoginController = require('./controllers/adminLoginController')
// const { upload } = require('./controllers/productController');
const userController = require('./controllers/userController');

const workerController = require('./controllers/workerController');
const workController = require('./controllers/workController');
const workerServiceAssignmentController = require('./controllers/workerServiceAssignmentController');

const servicesController = require("./controllers/serviceController");
const serviceRequestController = require("./controllers/serviceRequestController");

// const groupController = require('./controllers/groupController');
// const workerGroupController = require('./controllers/workerGroupController');
// const scheduleController = require('./controllers/scheduleController');


const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ['GET', 'POST', 'PUT','DELETE'],
  credentials: true
}));
app.use(express.static('Public'))

// admin-route
app.get('/', adminController.getAllAdmins);
app.post('/create', adminController.createAdmin);
app.put('/update/:id', adminController.updateAdmin);
app.delete('/delete/:id', adminController.deleteAdmin);
app.get('/getrecord/:id', adminController.getRecordById);

//admin-login
app.post('/adminLogin', adminLoginController.adminLogin);

//user
app.post('/userRegister', userController.userRegister);
app.post('/userLogin', userController.userLogin);

// state-route
app.get('/states', stateController.getAllStates);
app.post('/createState', stateController.createState);
app.put('/updateState/:id', stateController.updateState);
app.delete('/deleteState/:id', stateController.deleteState);
app.get('/getStateRecord/:id', stateController.getStateRecord);

// city-route
app.post('/createCity', cityController.createCity);
app.get('/getAllCities', cityController.getAllCities);
app.get('/getCities', cityController.getCities);
app.delete('/deleteCity/:id', cityController.deleteCity);
app.put('/updateCity/:id', cityController.updateCity);
app.get('/getCitiesRecord/:id', cityController.getCitiesRecord);

//area-route
app.post('/createArea', areaController.createArea);
app.get('/getAllAreas', areaController.getAllAreas);
app.get('/getAreas', areaController.getAreas);
app.delete('/deleteArea/:id', areaController.deleteArea);
app.put('/updateArea/:id', areaController.updateArea);
app.get('/getAreasRecord/:id', areaController.getAreasRecord);

//product-type route
app.post('/createProductType', pTypeController.createProductType);
app.get('/getAllProductType', pTypeController.getAllProductType);
app.delete('/deleteProductType/:id', pTypeController.deleteProductType);
app.put('/updateProductType/:id', pTypeController.updateProductType);
app.get('/getProductTypeRecord/:id', pTypeController.getProductTypeRecord);

//product-category route
app.post('/createProductCategory', pCategoryController.createProductCategory)
app.get('/getAllProductCategory', pCategoryController.getAllProductCategory);
app.delete('/deleteProductCategory/:id',pCategoryController.deleteProductCategory);
app.put('/updateProductCategory/:id', pCategoryController.updateProductCategory);
app.get('/getProductCategoryRecord/:id', pCategoryController.getProductCategoryRecord);

//product-weight route
app.post('/createProductWeight', pWeightController.createProductWeight);
app.get('/getAllProductWeight', pWeightController.getAllProductWeight);
app.delete('/deleteProductWeight/:id', pWeightController.deleteProductWeight);
app.put('/updateProductWeight/:id', pWeightController.updateProductWeight);
app.get('/getProductWeightRecord/:id', pWeightController.getProductWeightRecord);

//color-table route
app.post('/createColor', colorController.createColor);
app.get('/getAllColors', colorController.getAllColors);
app.delete('/deleteColorName/:id', colorController.deleteColorName);
app.put('/updateColorName/:id', colorController.updateColorName);
app.get('/getColorRecord/:id', colorController.getColorRecord);

//product-table route
app.post('/createProduct', upload.single('Image'), createProduct);
app.get('/getAllProduct', getAllProduct);
app.delete('/deleteProduct/:id', deleteProduct);
app.put('/updateProduct/:id',upload.single('Image'), updateProduct);
app.get('/getProductById/:id', getProductById);

app.get('/getProductDetailById/:id', getProductDetailById)

// Worker routes
app.post('/workers', workerController.createWorker);
app.get('/workers', workerController.getAllWorkers);
app.get('/workers/:id', workerController.getWorkerById);
app.put('/workers/:id', workerController.updateWorker);
app.delete('/workers/:id', workerController.deleteWorker);

// Work routes
app.post('/works', workController.createWork);
app.get('/works', workController.getAllWorks);
app.get('/works/:id', workController.getWorkById);
app.put('/works/:id', workController.updateWork);
app.delete('/works/:id', workController.deleteWork);


app.post('/worker-service-assignments', workerServiceAssignmentController.createWorkerServiceAssignment);
app.get('/worker-service-assignments', workerServiceAssignmentController.getAllWorkerServiceAssignments);
app.get('/worker-service-assignments/:id', workerServiceAssignmentController.getWorkerServiceAssignmentById);
app.put('/worker-service-assignments/:id', workerServiceAssignmentController.updateWorkerServiceAssignment);
app.delete('/worker-service-assignments/:id', workerServiceAssignmentController.deleteWorkerServiceAssignment);
app.get('/worker-service-assignments/:workerId', workerServiceAssignmentController.getAssignedWork);


//service-category route
app.get("/services", servicesController.getServices);
app.post("/services", servicesController.addService);
app.put("/services/:id", servicesController.updateService);
app.delete("/services/:id", servicesController.deleteService);

//service-request route
app.get("/serviceRequests", serviceRequestController.getAllServiceRequests);
app.post(
  "/createServiceRequest",
  serviceRequestController.createServiceRequest
);
app.put("/updateStatus/:id", serviceRequestController.updateStatus);
app.delete("/deleteRequest/:id", serviceRequestController.deleteRequest);
app.get(
  "/getAllServiceRequestsFromUser",
  serviceRequestController.getAllServiceRequestsFormUser
);


// // Group routes
// app.post('/groups', groupController.createGroup);
// app.get('/groups', groupController.getAllGroups);
// app.get('/groups/:id', groupController.getGroupById);
// app.put('/groups/:id', groupController.updateGroup);
// app.delete('/groups/:id', groupController.deleteGroup);

// // WorkerGroup routes
// app.post('/worker-groups', workerGroupController.addWorkerToGroup);
// app.get('/worker-groups', workerGroupController.getWorkerGroups);
// app.delete('/worker-groups/:workerId/:groupId', workerGroupController.removeWorkerFromGroup);

// // Schedule routes
// app.post('/schedules', scheduleController.createSchedule);
// app.get('/schedules', scheduleController.getAllSchedules);
// app.get('/schedules/group/:GroupID', scheduleController.getSchedulesByGroupID);
// app.delete('/schedules/:ScheduleID', scheduleController.deleteSchedule);

app.listen(3030, () => {
  console.log("Running");
});