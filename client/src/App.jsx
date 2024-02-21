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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
