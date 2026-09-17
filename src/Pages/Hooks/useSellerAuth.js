import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const useSellerAuth = () => {
  const [seller, setSeller] = useState(() => {
    try {
      const stored = localStorage.getItem("seller");
      if (!stored || stored === "undefined") return null;
      return JSON.parse(stored);
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  // Login
  const sellerLogin = async (mobileNumber, password, onSuccess) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("https://dailyshopping-backend.onrender.com/api/sellers/login", {
        mobileNumber,
        password,
      });

      if (data.success) {
        setSeller(data.seller);
        localStorage.setItem("seller", JSON.stringify(data.seller));
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          timer: 2000,
          showConfirmButton: false,
        });
        onSuccess?.(data.seller);
      } else {
        Swal.fire({ icon: "error", title: "Login Failed", text: data.message });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password — শুধু mobile number দিয়ে
  const resetPassword = async (mobileNumber, newPassword, confirmNewPassword) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("https://dailyshopping-backend.onrender.com/api/sellers/reset-password", {
        mobileNumber,
        newPassword,
        confirmNewPassword,
      });

      if (data.success) {
        Swal.fire({ icon: "success", title: "Password Reset!", text: data.message, timer: 2500, showConfirmButton: false });
        return true;
      } else {
        Swal.fire({ icon: "error", title: "Failed", text: data.message });
        return false;
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.message || "Something went wrong",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const sellerLogOut = (navigate) => {
    setSeller(null);
    localStorage.removeItem("seller");
    navigate("/sellerLogin");
  };

  return { seller, isLoading, sellerLogin, resetPassword, sellerLogOut, setSeller };
};

export default useSellerAuth;