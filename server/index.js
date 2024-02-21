const express = require('express')
const cors = require('cors')
const adminController = require('./controllers/adminController');
const stateController = require('./controllers/stateController');
const cityController = require('./controllers/cityController');
const areaController = require('./controllers/areaController');

const app = express();
app.use(express.json());
app.use(cors());

// admin-route
app.get('/', adminController.getAllAdmins);
app.post('/create', adminController.createAdmin);
app.put('/update/:id', adminController.updateAdmin);
app.delete('/delete/:id', adminController.deleteAdmin);
app.get('/getrecord/:id', adminController.getRecordById);

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

app.listen(3030, () => {
  console.log("Running");
});