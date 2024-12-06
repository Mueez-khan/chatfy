import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/slices/authSlice";
import { setUser } from "../redux/slices/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

   const navigateToRegister = () =>{
    navigate("/register")
  }

  const handleSubmit = async (e) => {
    try {
      setLoading(true);

      e.preventDefault();

      const response = await axios.post(
        "http://localhost:8000/api/v1/login",
        userData
      );

      console.log("Response" , response.data.user)

      const token = response.data.token;
      const user = response.data.user;
      

      dispatch(setToken(token));
      dispatch(setUser(user));

      if (response.data.success == true) {
        setLoading(false);
      }
      console.log("Response", response);
      setUserData({
        email: "",
        password: "",
      });

      toast.success("Logged in!");

      navigate("/");

    } catch (err) {

      console.log("Error", err);
      setLoading(false);
      toast.error(
        `Login failed: ${err.response?.data?.message || err.message}`
      );
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-richblack-900 via-richblack-800 to-richblack-700 text-white">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg  p-8 rounded shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-700">Login</h2>

          {/* {error && <p className="text-red-500">{error}</p>} */}

          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            {loading ? "Processing ... " : "Login"}
          </button>
          <div>
        <button onClick={navigateToRegister} className="text-blue-950 mt-4 ">Register</button>
        </div>
        </form>
      </div>
    </div>
  );
}
