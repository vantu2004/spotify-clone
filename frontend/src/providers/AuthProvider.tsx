import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import React from "react";

const updateApiToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const initAuth = async () => {
      setLoading(true);

      try {
        const token = await getToken();
        updateApiToken(token);
      } catch (error: any) {
        console.error("Error fetching token:", error);
        updateApiToken(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );

  return <>{children}</>;
};

export default AuthProvider;
