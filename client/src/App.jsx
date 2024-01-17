import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Admin } from "./Admin"
import { CreateAdmin } from "./CreateAdmin"
import { UpdateAdmin } from "./UpdateAdmin"
import { State } from "./stateComponent/State"
import { CreateState } from "./stateComponent/CreateState"
import { UpdateState } from "./stateComponent/UpdateState"

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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
