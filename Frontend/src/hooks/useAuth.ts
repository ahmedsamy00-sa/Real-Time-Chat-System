import { useState, useEffect } from "react";
import { User, authService } from "@/lib/auth";
import { getCurrentUser } from "@/data/mockData";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("useAuth effect - token:", token);

    const currentUser: User | null = getCurrentUser();
    console.log("useAuth effect - currentUser:", currentUser);

    setUser(currentUser);
    setIsLoading(false);
  }, []);
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Login response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "فشل في تسجيل الدخول");
      }

      const data = await response.json();
      const user = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        avatar:
          data.user.avatar ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            data.user.name
          )}&background=0ea5e9&color=fff`,
        phone: data.user.phone || "",
      };

      console.log("Login response data:", user);

      // Store token in localStorage
      localStorage.setItem("authToken", data.token);
      // Store user data in localStorage for getCurrentUser function
      localStorage.setItem("currentUser", JSON.stringify(user));

      setUser(user);
      return { user, token: data.token };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    phone?: string
  ) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            phone: phone || "",
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "فشل في إنشاء الحساب");
      }

      console.log("Register response data:", response);
      const data = await response.json();
      const user = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        avatar:
          data.user.avatar ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            data.user.name
          )}&background=0ea5e9&color=fff`,
        phone: data.user.phone || "",
      };

      console.log("Register response data:", user);

      // Store token in localStorage
      localStorage.setItem("authToken", data.token);
      // Store user data in localStorage for getCurrentUser function
      localStorage.setItem("currentUser", JSON.stringify(user));

      setUser(user);
      return { user, token: data.token };
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser"); // Clear user data
    setUser(null);
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };
};
