'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserLogin, UserRegister } from '@/types/auth.types';
import authService from '@/services/auth.service';
import { isAuthenticated } from '@/utils/token.utils';
import { handleApiError } from '@/utils/error.utils';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    login: (credentials: UserLogin) => Promise<void>;
    register: (userData: UserRegister) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}

// контекст
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider компонент
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Проверяем токен при загрузке приложения
    useEffect(() => {
        const checkAuth = () => {
            if (isAuthenticated()) {
                // TODO: Здесь можно добавить запрос для получения данных пользователя
                // Пока просто проверяем наличие токена
            }
        };
        checkAuth();
    }, []);

    // Функция логина
    const login = async (credentials: UserLogin) => {
        try {
            setIsLoading(true);
            setError(null);
            
            const response = await authService.login(credentials);
            setUser(response.user);
            
            router.push('/chat');
        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Функция регистрации
    const register = async (userData: UserRegister) => {
        try {
            setIsLoading(true);
            setError(null);
            
            const response = await authService.register(userData);
            setUser(response.user);
            
            router.push('/verify-email');
        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Функция выхода
    const logout = () => {
        authService.logout();
        setUser(null);
        router.push('/login');
    };

    // Очистить ошибку
    const clearError = () => {
        setError(null);
    };

    const value: AuthContextType = {
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Хук для использования контекста
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth должен использоваться внутри AuthProvider');
    }
    return context;
};

