import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
// import About from "./pages/About";
import Dashboard from "./component/Dashboard";
import HomeDashboard from "./component/HomeDashboard";
import UploadFile from "./component/UploadFile";
import Video from "./component/Video";

export default function App() {
  return (
    // <div className="h-full">
    // <Dashboard/>
    // </div>

    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route index element={<Home />} /> */}
          <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}>
          
          <Route path="videoDashboard" element={<HomeDashboard/>} />
          <Route path="upload" element={<UploadFile/>}/>
          <Route path="videos" element={<Video/>}/>
          {/* <Route path="dashboard" element={<Dashboard/>} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
