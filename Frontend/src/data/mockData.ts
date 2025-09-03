import { User } from "@/lib/auth";

export const getCurrentUser = (): User | null => {
  // Get user from localStorage (this will be the real logged-in user)
  const userStr = localStorage.getItem("currentUser");
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      return user;
    } catch (e) {
      console.error("Error parsing user from localStorage:", e);
    }
  }
  return null;
};
