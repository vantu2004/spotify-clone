import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "@/pages/home/HomePage";
import AuthCallbackPage from "@/pages/auth-callback/AuthCallbackPage";
import { axiosInstance } from "./lib/axios";

const App = () => {
  // const getUserData = async () => {
  //   try {
  //     const response = await axiosInstance.get("/users", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log("User data:", response.data);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
      </Routes>
    </>
  );
};

export default App;
