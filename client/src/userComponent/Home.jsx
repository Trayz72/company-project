import { useEffect, useState } from "react";
import { useParams, useNavigate,  Route, Routes } from "react-router-dom";
import { NavUser } from "./NavUser";
import { logContext } from "./Context";
import { ProductList } from "./ProductList";
import { ProductDetail } from "./ProductDetail";
import { CartItem } from "./CartItem";
import { ServiceList } from "./ServiceList";
import { ServiceDetail } from "./ServiceDetail";
import { ServiceCart } from "./ServiceCart";

function Home() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  const logout = () => {
    setUserId(null);
    navigate("/userLogin");
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
            <Route path="/cartitem" element={<CartItem/>}></Route>
            <Route path="/serviceList" element={<ServiceList userId={userId}/>}></Route>
            <Route path="/serviceDetail/:id" element={<ServiceDetail/>}></Route>
            <Route path="/servicecart" element={<ServiceCart/>}></Route>
          </Route>
        </Routes>
      </logContext.Provider>
    </div>
  );
}

export default Home;