import {
  createContext,
  useState,
  type ReactNode,
  useEffect,
  useContext,
} from "react";
import { api } from "../services/api";
import { Loading } from "../components/loading";

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
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
  uploadProfilePhoto: (file: File) => Promise<void>;
  removeProfilePhoto: () => Promise<void>;
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
        setUser(response.data.user);
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

  async function uploadProfilePhoto(file: File) {
    const formData = new FormData();
    formData.append("photo", file);

    const response = await api.post("/profile/photo", formData);
    setUser(response.data.user);
  }

  async function removeProfilePhoto() {
    await api.delete("/profile/photo");
    setUser((prevUser) =>
      prevUser ? { ...prevUser, avatarUrl: undefined } : null,
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        uploadProfilePhoto,
        removeProfilePhoto,
        loading,
      }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
