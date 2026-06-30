import { createContext, useState, type ReactNode, useEffect, useContext} from "react";
import { api } from "../services/api";

interface User{
    id: string;
    name: string;
    email: string;
}

interface LoginCredentials{
    email: string;
    password: string;
}

interface AuthContextData{
    user: User | null;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('@Cybertech:token');
        const storedUser = localStorage.getItem('@Cybertech:user');

        if (storedToken && storedUser) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(JSON.parse(storedUser));
        }
    }, []);

    async function login({email, password}: LoginCredentials) {
        const response = await api.post('/login', { email, password });
        const {token, user} = response.data;

        localStorage.setItem('@Cybertech:token', token);
        localStorage.setItem('@Cybertech:user', JSON.stringify(user));

        setUser(user);
    }

    function logout() {
        localStorage.removeItem('@Cybertech:token');
        localStorage.removeItem('@Cybertech:user');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}