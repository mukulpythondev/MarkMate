import axios from "@/lib/axios"; // your axios instance
import { useContext, useEffect, useState, createContext } from "react";

interface AuthContextType {
  user: any; // Replace 'any' with your user type
  loading: boolean;
  fetchCurrentUser: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with your user type
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null); // Replace 'any' with your user type
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get('/users/current-user', { withCredentials: true });
      if (res.data.success) {
        setUser(res.data.data); // This should correctly set the user
      }
    } catch (error) {
      setUser(null);
      console.error("Failed to fetch current user:", error); // Log the error for debugging
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, fetchCurrentUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};