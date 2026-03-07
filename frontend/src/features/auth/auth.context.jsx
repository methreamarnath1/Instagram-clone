import { createContext, useState, useEffect } from "react";
import { login, register, getMe } from "./services/auth.api.jsx";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start with true
  const [isInitialized, setIsInitialized] = useState(false);

  // Fetch the current user when the app loads
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        console.log("🔄 Fetching current user...");
        const response = await getMe();
        console.log("✅ User fetched:", response.data);
        setUser(response.data);
      } catch (err) {
        console.log("❌ No user logged in or error fetching user:", err);
        setUser(null);
      } finally {
        setLoading(false);
        setIsInitialized(true);
        console.log("✅ Auth initialized");
      }
    };

    initializeAuth();
  }, []); // Run once on mount

  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const response = await login(username, password);
      console.log("✅ Login successful:", response.data);
      setUser(response.data);
      return response;
    } catch (err) {
      console.error("❌ Login error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const response = await register(username, email, password);
      console.log("✅ Registration successful:", response.data);
      setUser(response.data);
      return response;
    } catch (err) {
      console.error("❌ Registration error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleGetMe = async () => {
    setLoading(true);
    try {
      const response = await getMe();
      console.log("✅ User refreshed:", response.data);
      setUser(response.data);
      return response;
    } catch (err) {
      console.error("❌ Get me error:", err);
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    console.log("🚪 Logging out...");
    setUser(null);
    // Clear any stored tokens if applicable
    localStorage.removeItem("token");
  };

  // Don't render children until auth is initialized
  if (!isInitialized) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        handleLogin,
        handleRegister,
        handleGetMe,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
