'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserLogin, UserRegister } from '@/types/auth.types';
import authService from '@/services/auth.service';
import { isAuthenticated, getToken, getRefreshToken } from '@/utils/token.utils';
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const accessToken = getToken();
            const refreshToken = getRefreshToken();
            
            // Если есть refresh_token но нет access_token - обновляем
            if (!accessToken && refreshToken) {
                try {
                    await authService.refreshToken();
                    console.log('Access токен обновлен при загрузке');
                } catch (error) {
                    console.error('Не удалось обновить токен при загрузке:', error);
                    authService.logout();
                    router.push('/login');
                }
            }
        };
        checkAuth();
    }, [router]);

    const login = async (credentials: UserLogin) => {
        try {
            setIsLoading(true);
            setError(null);
            
            const response = await authService.login(credentials);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
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

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth должен использоваться внутри AuthProvider');
    }
    return context;
};

