
import {Routes, Route} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import Messages from "./components/Messages";
// import SideBar from "./components/SideBar";
import Home from "./pages/Home";
import SendMessage from "./components/SendMessage";
// import ProtectedRoute from "./components/ProtectedRoute";


function App() {

 
  

  return (
    <>
     
  
      <Routes>
        <Route path="/" element={<Home></Home>}  />
        <Route path="/register" element={<Register/>}  />
        <Route path="/login" element={<Login/>}  />
        <Route path="/chat/:receiverId" element={<SendMessage/>}  />
      </Routes>
      
      <ToastContainer />
     
    </>
  )
}

export default App
