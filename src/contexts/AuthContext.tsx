import {
  createContext,
  useState,
  type ReactNode,
  useEffect,
  useContext,
} from "react";
import { api } from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromToken() {
      try {
        const response = await api.get("/profile");
        setUser(response.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadUserFromToken();
  }, []);

  async function login({ email, password }: LoginCredentials) {
    const response = await api.post("/login", { email, password });

    setUser(response.data.user);
  }

  async function logout() {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
