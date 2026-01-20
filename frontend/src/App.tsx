import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "@/pages/home/HomePage";
import AuthCallbackPage from "@/pages/auth-callback/AuthCallbackPage";
import { axiosInstance } from "./lib/axios";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/chat/ChatPage";

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
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signUpForceRedirectUrl={"/auth-callback"}
            />
          }
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
