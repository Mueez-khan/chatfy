import SideBar from "../components/SideBar";
import { TbLogout2 } from "react-icons/tb";
import { useSelector , useDispatch  } from "react-redux";
import { logOut } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
export default function Home() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogoutDetails = useSelector((state) => state.auth.logOut);

  const userDetails = useSelector((state) => state.auth.user);

  const logout = () =>{

      dispatch(logOut(userLogoutDetails));
      console.log("USer logout");
    navigate("/login")

  }

  return (
    <div className="min-h-[200px] bg-gray-100 flex justify-center items-center">
      <div className="flex flex-col sm:flex-row w-full max-w-[900px] bg-white p-4 rounded-lg shadow-lg">
        {/* <SendMessage className="w-full sm:w-2/3" /> */}

      <div >
        <button onClick={logout}><TbLogout2 /></button>
      </div>

        <div className=" m-auto">


        <h1 className="text-2xl ml-14  ">{userDetails ?  userDetails.firstName : "" }</h1>
        <h1 className="text-2xl"> Send a message</h1>
           
        </div>
        <SideBar className="w-full sm:w-1/3 mb-4 sm:mb-0 sm:mr-4" />
      </div>
    </div>
  );
}
