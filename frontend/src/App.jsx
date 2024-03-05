// import { Outlet } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navigation from "./pages/Auth/Navigation";
import Home from "./pages/Home.jsx";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
