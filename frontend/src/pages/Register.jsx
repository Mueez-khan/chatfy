import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [loading , setLoading ] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_URL}/register`, userData);
      if(response.data.success == true){
        setLoading(false);
      }
      toast.success("Registration successful! Welcome!");
      navigate("/login")

    } catch (err) {
      toast.error(`Registration failed: ${err.response?.data?.message || err.message}`);

      console.error("Error during registration:", err.response?.data || err.message);
    }

    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
    });
  };

  return (
    
    <>

     
    <div className="min-h-screen bg-gradient-to-tr from-purple-950  to-purple-600
     flex items-center justify-center">

    <div className="content-center " >
    <h1 className="flex items-center justify-center text-4xl text-purple-50 mb-10 text-  " >Register</h1>
      <form onSubmit={submitHandler} className="items-center  w-80 ">
        <input
          className="w-full p-2 mb-4 text-black border border-gray-300 rounded"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={userData.firstName || ""}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 mb-4 text-black border border-gray-300 rounded"
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={userData.lastName || ""}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 mb-4 text-black border border-gray-300 rounded"
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email || ""}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 mb-4 text-black border border-gray-300 rounded"
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={userData.phoneNumber || ""}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 mb-4 text-black border border-gray-300 rounded"
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password || ""}
          onChange={handleChange}
        />
        <button
          className="w-full bg-pink-600 text-white p-2 rounded hover:bg-green-600"
          type="submit"
        >
          {loading ? "Loading ..." : "Register"}
        </button>
      </form>
    </div>

    </div>

    </>

  );
}
