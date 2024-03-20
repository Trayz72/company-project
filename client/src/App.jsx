import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Work } from "./Component/Work";
import { CreateWork } from "./Component/CreateWork";
import { WorkUpdate } from "./Component/WorkUpdate";
import { Admin } from "./Component/Admin";
import { CreateAdmin } from "./Component/CreateAdmin";
import { UpdateAdmin } from "./Component/UpdateAdmin";
import { State } from "./Component/State";
import { CreateState } from "./Component/CreateState";
import { UpdateState } from "./Component/UpdateState";
import { CreateCity } from "./Component/CreateCity";
import { City } from "./Component/City";
import { CityUpdate } from "./Component/CityUpdate";
import { CreateArea } from "./Component/CreateArea";
import { Area } from "./Component/Area";
import { AreaUpdate } from "./Component/AreaUpdate";
import { CreateProductType } from "./Component/CreateProductType";
import { ProductType } from "./Component/ProductType";
import { ProductTypeUpdate } from "./Component/ProductTypeUpdate";
import { CreateProductCategory } from "./Component/CreateProductCategory";
import { ProductCategory } from "./Component/ProductCategory";
import { ProductCategoryUpdate } from "./Component/ProductCategoryUpdate";
import { CreateProductWeight } from "./Component/CreateProductWeight";
import { ProductWeight } from "./Component/ProductWeight";
import { ProductWeightUpdate } from "./Component/ProductWeightUpdate";
import { CreateColor } from "./Component/CreateColor";
import { Color } from "./Component/Color";
import { ColorUpdate } from "./Component/ColorUpdate";
import { CreateProducts } from "./Component/CreateProducts";
import { Products } from "./Component/Products";
import { ProductsUpdate } from "./Component/ProductsUpdate";
import { NavBar } from "./Component/NavBar";
import { AdminLogin } from "./Component/AdminLogin";
import UserRegistration from "./userComponent/UserRegistration";
import { UserLogin } from "./userComponent/UserLogin";
import Home from "./userComponent/Home";

import { Worker } from "./Component/Worker";
import { WorkerCreate } from "./Component/WorkerCreate";
import { WorkerUpdate } from "./Component/WorkerUpdate";
import AddService from "./Component/AddService";
import UpdateService from "./Component/UpdateService";
import Service from "./Component/Services";
import { ServiceRequestAdmin } from "./Component/ServiceRequestAdmin";
import ServiceRequestForm from "./userComponent/ServiceRequestForm";
import ServiceStatus from "./userComponent/ServiceStatus";

import { WorkerAssignedPage } from "./userComponent/WorkerAssignedPage";


import {UpdateWorkerServiceAssignment} from './Component/UpdateWorkerServiceAssignment';
import { WorkerServiceAssignmentList } from "./Component/WorkerServiceAssignmentList";
import { WorkerServiceAssignmentForm } from "./Component/WorkerServiceAssignmentForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/dashboard" element={<NavBar />}>
            <Route path="/dashboard/admin" element={<Admin />} />
            <Route path="/dashboard/create" element={<CreateAdmin />} />
            <Route path="/dashboard/update/:id" element={<UpdateAdmin />} />

            <Route path="/dashboard/state" element={<State />} />
            <Route path="/dashboard/createState" element={<CreateState />} />
            <Route path="/dashboard/updateState/:id" element={<UpdateState />} />

            <Route path="/dashboard/city" element={<City />} />
            <Route path="/dashboard/createCity" element={<CreateCity />} />
            <Route path="/dashboard/CityUpdate/:id" element={<CityUpdate />} />

            <Route path="/dashboard/area" element={<Area />} />
            <Route path="/dashboard/createArea" element={<CreateArea />} />
            <Route path="/dashboard/AreaUpdate/:id" element={<AreaUpdate />} />

            <Route path="/dashboard/createProductType" element={<CreateProductType />} />
            <Route path="/dashboard/productType" element={<ProductType />} />
            <Route path="/dashboard/productTypeUpdate/:id" element={<ProductTypeUpdate />} />

            <Route path="/dashboard/createProductCategory" element={<CreateProductCategory />} />
            <Route path="/dashboard/productCategory" element={<ProductCategory />} />
            <Route path="/dashboard/productCategoryUpdate/:id" element={<ProductCategoryUpdate />} />

            <Route path="/dashboard/createProductWeight" element={<CreateProductWeight />} />
            <Route path="/dashboard/productWeight" element={<ProductWeight />} />
            <Route path="/dashboard/productWeightUpdate/:id" element={<ProductWeightUpdate />} />

            <Route path="/dashboard/createColor" element={<CreateColor />} />
            <Route path="/dashboard/color" element={<Color />} />
            <Route path="/dashboard/colorUpdate/:id" element={<ColorUpdate />} />

            <Route path="/dashboard/createProducts" element={<CreateProducts />} />
            <Route path="/dashboard/products" element={<Products />} />
            <Route path="/dashboard/productUpdate/:id" element={<ProductsUpdate />} />

            {/* New routes for work CRUD operations */}
            <Route path="/dashboard/work" element={<Work />} />
            <Route path="/dashboard/createWork" element={<CreateWork />} />
            <Route path="/dashboard/WorkUpdate/:id" element={<WorkUpdate />} />
            
            <Route path="/dashboard/worker" element={<Worker />} />
            <Route path="/dashboard/createWorker" element={<WorkerCreate />} />
            <Route path="/dashboard/updateWorker/:id" element={<WorkerUpdate />} />

            <Route path="/dashboard/services" element={<Service />} />
        <Route path="/dashboard/AddService" element={<AddService />} />
        <Route path="/dashboard/UpdateService/:id" element={<UpdateService />} />
        <Route path="/dashboard/serviceReqs" element={<ServiceRequestAdmin />} />

        <Route path="/dashboard/services" element={<Service />} />
        <Route path="/dashboard/AddService" element={<AddService />} />
        <Route path="/dashboard/UpdateService/:id" element={<UpdateService />} />
        <Route path="/dashboard/serviceReqs" element={<ServiceRequestAdmin />} />

        <Route  path="/dashboard/worker-service-assignments/create" element={<WorkerServiceAssignmentForm/>} />
          <Route  path="/dashboard/worker-service-assignments/:id/update" element={<UpdateWorkerServiceAssignment/>} />
          <Route  path="/dashboard/worker-service-assignments" element={<WorkerServiceAssignmentList/>}/>
          

          </Route>
          <Route path="/userRegistration" element={<UserRegistration />} />
          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/home/:id/*" element={<Home />} >

          <Route path="serviceForm" element={<ServiceRequestForm  />} />
          <Route path="serviceStatus" element={<ServiceStatus />} />
            </Route>
            <Route path="/workerPage" element={<WorkerAssignedPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
