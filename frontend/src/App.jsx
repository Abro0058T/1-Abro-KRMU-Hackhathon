import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./pages/Layout";
// import Home from "./pages/Home";
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";
// import About from "./pages/About";
import Dashboard from "./component/Dashboard";

export default function App() {
  return (
    <div className="h-full">
    <Dashboard/>
    </div>

    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Layout />}>
    //       <Route index element={<Home />} />
    //       <Route path="register" element={<Register />} />
    //       <Route path="login" element={<Login />} />
    //       <Route path="about" element={<About />} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  );
}
