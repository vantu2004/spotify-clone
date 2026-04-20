import Topbar from "@/components/TopBar";
import { useAuthStore } from "@/stores/useAuthStore";
import React from "react";

const HomePage = () => {
  // đã check trong provider
  const { isAdmin } = useAuthStore();
  console.log(isAdmin);
  return (
    <div>
      <Topbar />
    </div>
  );
};

export default HomePage;
