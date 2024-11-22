import React, { createContext, useContext, useState } from 'react';

type Role = 'ADMIN' | 'USER' 

interface User {
    uid: string;
    roles: Role[];
}


interface AuthContextType {
    user: User | null;
    login: (uid: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (uid: string, password: string) => {
    
        if (uid === 'admin' && password === 'admin123') {
            const user: User = {
                uid: 'admin',
                roles: ['ADMIN', 'USER']
            };
            setUser(user);
            sessionStorage.setItem('AUTH_TOKEN', 'ASJDFJF87ADF8745LK4598SAD7FAJSDF45JSDLFKAS');
            sessionStorage.setItem('USER_ROLES', JSON.stringify(user.roles));
            return true;
        } else if (uid === 'user' && password === 'user123') {
            const user: User = {
                uid: 'user',
                roles: ['USER']
            };
            setUser(user);
            sessionStorage.setItem('AUTH_TOKEN', 'USER_TOKEN_HERE');
            sessionStorage.setItem('USER_ROLES', JSON.stringify(user.roles));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('AUTH_TOKEN');
        sessionStorage.removeItem('USER_ROLES');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};