import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import * as authApi from "../api/auth";
import type { User } from "../interfaces/user";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: { name: string; email: string; password: string; title: string }) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await authApi.login(email, password);
      setUser(data.user);
      setToken(data.access_token);
      localStorage.setItem("hotel_user", JSON.stringify(data.user));
      localStorage.setItem("hotel_token", data.access_token);
      return true;
    } catch {
      return false;
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    title: string;
  }): Promise<boolean> => {
    try {
      const data = await authApi.register(userData);
      setToken(data.access_token);
      setUser(data.user);
      localStorage.setItem("hotel_user", JSON.stringify(data.user));
      localStorage.setItem("hotel_token", data.access_token);
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("hotel_user");
    localStorage.removeItem("hotel_token");
    try {
      await authApi.logout();
    } catch {}
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("hotel_token");
    const savedUser = localStorage.getItem("hotel_user");
    if (savedToken) {
      setToken(savedToken);
    }
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
