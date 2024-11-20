import { createContext, useContext } from "react";

export interface User {
  id: number;
  name: string;
}

export interface AuthContextState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const defaultState: AuthContextState = {
  user: null,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextState>(defaultState);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};