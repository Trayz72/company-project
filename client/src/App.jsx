import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Admin } from "./Component/Admin"
import { CreateAdmin } from "./Component/CreateAdmin"
import { UpdateAdmin } from "./Component/UpdateAdmin"
import { State } from "./Component/State"
import { CreateState } from "./Component/CreateState"
import { UpdateState } from "./Component/UpdateState"
import { CreateCity } from "./Component/CreateCity"
import { City } from "./Component/City"
import { CityUpdate } from "./Component/CityUpdate"
import { CreateArea } from "./Component/CreateArea"
import { Area } from "./Component/Area"
import { AreaUpdate } from "./Component/AreaUpdate"
import { CreateProductType } from "./Component/CreateProductType"
import { ProductType } from "./Component/ProductType"
import { ProductTypeUpdate } from "./Component/ProductTypeUpdate"
import { CreateProductCategory } from "./Component/CreateProductCategory"
import { ProductCategory } from "./Component/ProductCategory"
import { ProductCategoryUpdate } from "./Component/ProductCategoryUpdate"
import { CreateProductWeight } from "./Component/CreateProductWeight"
import { ProductWeight } from "./Component/ProductWeight"
import { ProductWeightUpdate } from "./Component/ProductWeightUpdate"
import { CreateColor } from "./Component/CreateColor"
import { Color } from "./Component/Color"
import { ColorUpdate } from "./Component/ColorUpdate"
import { CreateProducts } from "./Component/CreateProducts"
import { Products } from "./Component/Products"
import { ProductsUpdate } from "./Component/ProductsUpdate"
import { CreateService } from "./Component/CreateService"
import { Service } from "./Component/Service"
import { ServiceUpdate } from "./Component/ServiceUpdate"
import { NavBar } from "./Component/NavBar"
import { AdminLogin } from "./Component/AdminLogin"
import UserRegistration from "./userComponent/UserRegistration"
import { UserLogin } from "./userComponent/UserLogin"
import Home from "./userComponent/Home"

function App() {

  return (
    <>
      <BrowserRouter>
      {/* Admin Dashboard Routes
      {isLoggedIn && (
        <> */}
        <Routes>
          <Route path="/" element={<AdminLogin/>}></Route>
          <Route path="/dashboard" element={<NavBar/>}>
            <Route path="/dashboard/admin" element={<Admin/>}></Route>
            <Route path="/dashboard/create" element={<CreateAdmin/>}></Route>
            <Route path="/dashboard/update/:id" element={<UpdateAdmin/>}></Route>

            
            <Route path="/dashboard/state" element={<State/>}></Route>
            <Route path="/dashboard/createState" element={<CreateState/>}></Route>
            <Route path="/dashboard/updateState/:id" element={<UpdateState/>}></Route>
            
            <Route path="/dashboard/city" element={<City/>}></Route>
            <Route path="/dashboard/createCity" element={<CreateCity/>}></Route>
            <Route path="/dashboard/CityUpdate/:id" element={<CityUpdate/>}></Route>

            <Route path="/dashboard/area" element={<Area/>}></Route>
            <Route path="/dashboard/createArea" element={<CreateArea/>}></Route>
            <Route path="/dashboard/AreaUpdate/:id" element={<AreaUpdate/>}></Route>

            <Route path="/dashboard/createProductType" element={<CreateProductType/>}></Route>
            <Route path="/dashboard/productType" element={<ProductType/>}></Route>
            <Route path="/dashboard/productTypeUpdate/:id" element={<ProductTypeUpdate/>}></Route>

            <Route path="/dashboard/createProductCategory" element={<CreateProductCategory/>}></Route>
            <Route path="/dashboard/productCategory" element={<ProductCategory/>}></Route>
            <Route path="/dashboard/productCategoryUpdate/:id" element={<ProductCategoryUpdate/>}></Route>

            <Route path="/dashboard/createProductWeight" element={<CreateProductWeight/>}></Route>
            <Route path="/dashboard/productWeight" element={<ProductWeight/>}></Route>
            <Route path="/dashboard/productWeightUpdate/:id" element={<ProductWeightUpdate/>}></Route>

            <Route path="/dashboard/createColor" element={<CreateColor/>}></Route>
            <Route path="/dashboard/color" element={<Color/>}></Route>
            <Route path="/dashboard/colorUpdate/:id" element={<ColorUpdate/>}></Route>

            <Route path="/dashboard/createProducts" element={<CreateProducts/>}></Route>
            <Route path="/dashboard/products" element={<Products/>}></Route>
            <Route path="/dashboard/productUpdate/:id" element={<ProductsUpdate/>}></Route>

            <Route path="/dashboard/createService" element={<CreateService/>}></Route>
            <Route path="/dashboard/service" element={<Service/>}></Route>
            <Route path="/dashboard/serviceupdate/:id" element={<ServiceUpdate/>}></Route>
          </Route>
          <Route path="/userRegistration" element={<UserRegistration/>}></Route>
          <Route path="/userLogin" element={<UserLogin/>}></Route>
          <Route path="/home/:id/*" element={<Home/>}>
          </Route>  
        </Routes>
        {/* </>
        )} */}
      </BrowserRouter>
    </>
  )
}

export default App
