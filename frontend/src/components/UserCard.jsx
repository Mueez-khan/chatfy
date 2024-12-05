import { useSelector } from "react-redux";
// Separate component for individual user card
const UserCard = ({ user , onClick }) => {
    // Combine first and last name, removing quotes
    const fullName = `${user.firstName} ${user.lastName}`.replace(/"/g, '');
    

    return (
        <li className="flex items-center space-x-4 py-3 
        hover:bg-gray-50 transition duration-150 ease-in-out cursor-pointer "   onClick={onClick} >
            {/* User Image */}
           
            <img 
                src={user.userImage} 
                alt={fullName}
                className="w-12 h-12 rounded-full object-cover"
            />
            {/* User Name */}
            <div>
                <h3 className="text-sm font-medium text-gray-900">
                    {fullName}
                </h3>
                <p className="text-xs text-gray-500">
                    {user.email}
                </p>
            </div>
        </li>
    );
};

export default UserCard;