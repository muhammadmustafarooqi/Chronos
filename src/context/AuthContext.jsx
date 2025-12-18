import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('chronos-user');
            return saved ? JSON.parse(saved) : null;
        }
        return null;
    });

    const [users, setUsers] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('chronos-users');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('chronos-user', JSON.stringify(user));
        } else {
            localStorage.removeItem('chronos-user');
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem('chronos-users', JSON.stringify(users));
    }, [users]);

    const register = (userData) => {
        // Check if email already exists
        const existingUser = users.find(u => u.email === userData.email);
        if (existingUser) {
            return { success: false, message: 'Email already registered' };
        }

        const newUser = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString(),
        };

        setUsers(prev => [...prev, newUser]);
        setUser(newUser);
        return { success: true, message: 'Registration successful' };
    };

    const login = (email, password) => {
        const foundUser = users.find(u => u.email === email && u.password === password);
        if (foundUser) {
            setUser(foundUser);
            return { success: true, message: 'Login successful' };
        }
        return { success: false, message: 'Invalid email or password' };
    };

    const logout = () => {
        setUser(null);
    };

    const updateUser = (updatedData) => {
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            register,
            login,
            logout,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};
