import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
import { useDispatch  } from "react-redux";
import { logOut }from "../redux/slices/authSlice";


export default function SideBar() {

  // const userDetails = useSelector((state) => state.auth.user);
  
 

  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    data: [],
    loading: true,
    error: null,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async () => {

    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/users` ,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

    

      setUserData({
        data: response.data.data || response.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      
      setUserData({
        data: [],
        loading: false,
        error: error.message,
      });
      if(error.response.data.success === false){
        dispatch(logOut());
        navigate("/login")
      }
      console.error("Error fetching users:", error);
    }
  };

  const handleUserClick = (user) => {
    navigate(`/chat/${user._id}`);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!userData.data) return [];

    return userData.data.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .replace(/"/g, "");
      return (
        fullName.includes(searchTerm.toLowerCase()) 
      );
    });
  }, [userData.data, searchTerm ]);

  if (userData.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    );
  }

  if (userData.error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        {userData.error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-xs h-screen flex flex-col">
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-800 p-4">Users</h2>
        {filteredUsers.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                onClick={() => handleUserClick(user)}
              />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center p-4">
            {searchTerm
              ? "No users found matching the search"
              : "No users found"}
          </p>
        )}
      </div>
    </div>
  );
}
