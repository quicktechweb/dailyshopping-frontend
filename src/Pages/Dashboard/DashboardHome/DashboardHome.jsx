import { useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import Modal from "react-modal";
import useAuth from "../../Hooks/useAuth";
import UserOverView from "../UserDashboard/UserOverView/UserOverView";
import AdminOverview from "../AdminDashboard/AdminOverview/AdminOverview";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const DashboardHome = () => {
  const [loader, setLoader] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const { user } = useAuth();
  const role = user?.newpartroles;
  const username = user?.displayName || "User";

  const isPasswordValid = (password) => {
    if (password.length < 8) return false;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasLetter && hasNumber;
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoader(true);
    const newPass = e.target.newPassword.value;
    if (!isPasswordValid(newPass)) {
      toast.error("Password not valid!");
      setLoader(false);
      return;
    }
    toast.success("Password changed successfully!");
    setLoader(false);
  };

  const closeModal = () => setIsOpen(false);

  // ROLE-BASED VIEW
  const renderDashboardByRole = () => {
    switch (role) {
      case "SUPERadmin":
        return (
          <div className=" rounded-2xl shadow-md w-full">
            {/* <h2 className="text-3xl font-bold text-blue-700 mb-4">
              👑 Super Admin Dashboard
            </h2> */}
           <AdminOverview/>
          </div>
        );

      case "Moderator":
        return (
          <div className="bg-gradient-to-r from-green-100 to-green-200 p-8 rounded-2xl shadow-md w-full">
            <h2 className="text-3xl font-bold text-green-700 mb-4">
              🧩 Moderator Dashboard
            </h2>
            <p className="text-gray-700">
              Review and approve user orders or content.
            </p>
          </div>
        );

      case "Support":
        return (
          <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-8 rounded-2xl shadow-md w-full">
            <h2 className="text-3xl font-bold text-yellow-700 mb-4">
              💬 Support Dashboard
            </h2>
            <p className="text-gray-700">
              Assist users and resolve their issues.
            </p>
          </div>
        );

      default:
        return (
          <div className="w-full">
            {/* <h2 className="text-3xl ms-6 font-bold text-purple-700 mb-4">
               User Dashboard
            </h2> */}
            <UserOverView />
            {/* <p className="text-gray-700">
              Welcome! Track your activity and manage your profile.
            </p> */}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-start mt-10 px-6 md:px-12 w-full max-w-6xl mx-auto">
   <div className="p-6 flex justify-between items-center w-full -mt-10">
  {role !== "SUPERadmin" && (
    <>
      {/* Left: Welcome */}
      <div className="text-left">
        <h1 className="text-2xl font-bold">
          {/* Welcome, <span className="text-orange-500">{username}</span> */}
        </h1>
      </div>

      {/* Right: Role */}
      <div className="text-right">
        <p className="text-lg font-medium text-gray-600">
          {/* Role: <span className="text-blue-600">{role || "user"}</span> */}
        </p>
      </div>
    </>
  )}
</div>




      {/* ROLE VIEW */}
      <div className="w-full">{renderDashboardByRole()}</div>

      {/* Password Modal */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
        <form onSubmit={handleChangePassword} className="p-10">
          <input
            className="bg-orange-400 px-5 py-3 focus:outline-none rounded-md font-semibold w-full text-white placeholder:text-white"
            type="password"
            placeholder="Enter new password"
            required
            name="newPassword"
          />
          <p className="text-xs my-3 text-red-600 font-medium">
            * Must be at least 8 characters and include both letters and numbers
          </p>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-green-500 text-white font-semibold px-4 py-2 rounded-md duration-300 active:scale-90 flex items-center justify-center"
            >
              {loader ? <FaSpinner className="text-white animate-spin" /> : "Change Password"}
            </button>
            <p
              onClick={closeModal}
              className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md duration-300 active:scale-90 select-none cursor-pointer"
            >
              Close
            </p>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DashboardHome;
