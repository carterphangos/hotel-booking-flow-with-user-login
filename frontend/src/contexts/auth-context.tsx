import React, { createContext, useContext, useState, useEffect } from "react";
import * as authApi from "../api/auth";
import type { User } from "../interfaces/user";
import { AUTH_CONSTANTS } from "../constants/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: { name: string; email: string; password: string; title: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await authApi.login(email, password);
      setUser(data.user);
      setToken(data.access_token);
      sessionStorage.setItem(AUTH_CONSTANTS.STORAGE_KEYS.USER, btoa(JSON.stringify(data.user)));
      sessionStorage.setItem(AUTH_CONSTANTS.STORAGE_KEYS.TOKEN, btoa(data.access_token));
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
      sessionStorage.setItem(AUTH_CONSTANTS.STORAGE_KEYS.USER, btoa(JSON.stringify(data.user)));
      sessionStorage.setItem(AUTH_CONSTANTS.STORAGE_KEYS.TOKEN, btoa(data.access_token));
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem(AUTH_CONSTANTS.STORAGE_KEYS.USER);
    sessionStorage.removeItem(AUTH_CONSTANTS.STORAGE_KEYS.TOKEN);
    try {
      await authApi.logout();
    } catch {}
  };

  useEffect(() => {
    const savedToken = sessionStorage.getItem(AUTH_CONSTANTS.STORAGE_KEYS.TOKEN);
    const savedUser = sessionStorage.getItem(AUTH_CONSTANTS.STORAGE_KEYS.USER);
    if (savedToken) {
      setToken(atob(savedToken));
    }
    if (savedUser) {
      setUser(JSON.parse(atob(savedUser)));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        loading,
      }}
    >
      {loading ? null : children}
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
