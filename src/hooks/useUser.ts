import { useAuth } from '@/context/AuthContext';

// Хук для получения данных текущего пользователя
export const useUser = () => {
    const { user, isLoading } = useAuth();
    
    return {
        user,
        isLoading,
        isAuthenticated: !!user,
    };
};

