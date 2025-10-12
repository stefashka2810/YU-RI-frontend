import apiRequest from "@/lib/api/client";
import { AuthResponse, UserLogin, UserRegister } from "@/types/auth.types";
import { saveToken, removeToken } from "@/utils/token.utils";

// Сервис для работы с авторизацией
const authService = {
    // Авторизация пользователя
    login: async (credentials: UserLogin): Promise<AuthResponse> => {
        const response = await apiRequest<AuthResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
        
        // Сохраняем токен после успешного логина
        if (response.access_token) {
            saveToken(response.access_token);
        }
        
        return response;
    },

    // Регистрация нового пользователя
    register: async (userData: UserRegister): Promise<AuthResponse> => {
        const response = await apiRequest<AuthResponse>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
        
        // Сохраняем токен после успешной регистрации
        if (response.access_token) {
            saveToken(response.access_token);
        }
        
        return response;
    },

    // Верификация email
    verifyEmail: async (token: string): Promise<{ message: string }> => {
        const response = await apiRequest<{ message: string }>('/auth/email/verify', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response;
    },

    // Выход из системы
    logout: (): void => {
        removeToken();
    },
};

export default authService;

