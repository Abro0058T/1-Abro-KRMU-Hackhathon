import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store.js";
import { Provider } from "react-redux";
// import { Route, RouterProvider, createRoutesFromElements } from "react-router";
// import { createBrowserRouter } from "react-router-dom";
// import Home from "./pages/Home.jsx";

// AUth
// import AdminRoute from "./pages/Admin/AdminRoute.jsx";

// Restricted
// import Login from "./pages/Auth/Login.jsx";
// import Register from "./pages/Auth/Register.jsx";
// import PrivateRoute from "./pages/Auth/PrivateRoute.jsx";
// import Profile from "./pages/User/Profile.jsx";

// import AllMovies from "./pages/Movies/AllMovies.jsx";
// import MovieDetails from "./pages/Movies/MovieDetails.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <RouterProvider router={router} /> */}
    {<App />}
  </Provider>
);
