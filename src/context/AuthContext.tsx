import React, { createContext, ReactNode, useState } from "react";

type User = {
    email: string;
};

type AuthContextType = {
    user: User | null;
    login: (email: string) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

type Props = {
    children: ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<User | null>(null);

    function login(email: string) {
        setUser({ email });
    }

    function logout() {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}