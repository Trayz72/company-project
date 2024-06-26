import { useEffect, useState } from "react";
import { useParams, useNavigate,  Route, Routes } from "react-router-dom";
import { NavUser } from "./NavUser";
import { logContext } from "./Context";
import { ProductList } from "./ProductList";
import { ProductDetail } from "./ProductDetail";
import ServiceRequestForm from "./ServiceRequestForm";
import ServiceStatus from "./ServiceStatus";

function Home() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  const logout = () => {
    setUserId(null);
    navigate("/");
  };

  useEffect(() => {
    setUserId(id);
  }, [id]);

  return (
    <div>
      <logContext.Provider value={{ userId, setUserId, logout }}>
        <Routes>
          <Route path="/" element={<NavUser/>}>
            <Route path="" element={<ProductList userId={userId}/>}></Route>
            <Route path="/productDetail/:id" element={<ProductDetail/>}></Route>
            <Route path="/serviceForm" element={<ServiceRequestForm />} />
          <Route path="/serviceStatus" element={<ServiceStatus />} />
          </Route>
        </Routes>
      </logContext.Provider>
    </div>
  );
}

export default Home;