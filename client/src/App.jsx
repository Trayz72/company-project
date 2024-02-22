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

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Admin/>}></Route>
          <Route path="/create" element={<CreateAdmin/>}></Route>
          <Route path="/update/:id" element={<UpdateAdmin/>}></Route>
          
          <Route path="/state" element={<State/>}></Route>
          <Route path="/createState" element={<CreateState/>}></Route>
          <Route path="/updateState/:id" element={<UpdateState/>}></Route>
          
          <Route path="/city" element={<City/>}></Route>
          <Route path="/createCity" element={<CreateCity/>}></Route>
          <Route path="/CityUpdate/:id" element={<CityUpdate/>}></Route>

          <Route path="/area" element={<Area/>}></Route>
          <Route path="/createArea" element={<CreateArea/>}></Route>
          <Route path="/AreaUpdate/:id" element={<AreaUpdate/>}></Route>

          <Route path="/createProductType" element={<CreateProductType/>}></Route>
          <Route path="/productType" element={<ProductType/>}></Route>
          <Route path="/productTypeUpdate/:id" element={<ProductTypeUpdate/>}></Route>

          <Route path="/createProductCategory" element={<CreateProductCategory/>}></Route>
          <Route path="/productCategory" element={<ProductCategory/>}></Route>
          <Route path="/productCategoryUpdate/:id" element={<ProductCategoryUpdate/>}></Route>

          <Route path="/createProductWeight" element={<CreateProductWeight/>}></Route>
          <Route path="/productWeight" element={<ProductWeight/>}></Route>
          <Route path="/productWeightUpdate/:id" element={<ProductWeightUpdate/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
