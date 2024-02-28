import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<PrivateRoute element={<MainPage/>}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verifyForgotPassword" element={<UpdatePassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
