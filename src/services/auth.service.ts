import apiRequest from "@/lib/api/client";
import { AuthResponse, UserLogin, UserRegister } from "@/types/auth.types";
import { saveToken, saveRefreshToken, removeToken, getRefreshToken } from "@/utils/token.utils";
import { API_BASE_URL } from "@/lib/api/endpoints";

// Сервис для работы с авторизацией
const authService = {
    login: async (credentials: UserLogin): Promise<AuthResponse> => {
        const response = await apiRequest<AuthResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
        
        console.log('Login response:', {
            hasAccessToken: !!response.access_token,
            hasRefreshToken: !!response.refresh_token,
            tokenType: response.token_type
        });
        
        if (response.access_token) {
            saveToken(response.access_token);
            console.log('Access token saved');
        } else {
            console.warn('Access token отсутствует в ответе!');
        }
        
        if (response.refresh_token) {
            saveRefreshToken(response.refresh_token);
            console.log('Refresh token saved');
        } else {
            console.warn('Refresh token отсутствует в ответе!');
        }
        
        return response;
    },

    // Регистрация нового пользователя
    register: async (userData: UserRegister): Promise<AuthResponse> => {
        const response = await apiRequest<AuthResponse>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
        
        if (response.access_token) {
            saveToken(response.access_token);
        }
        if (response.refresh_token) {
            saveRefreshToken(response.refresh_token);
        }
        
        return response;
    },

    // Обновить access токен используя refresh токен
    refreshToken: async (): Promise<string> => {
        const refreshToken = getRefreshToken();
        
        if (!refreshToken) {
            throw new Error('Refresh токен отсутствует');
        }

        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(refreshToken),
        });

        if (!response.ok) {
            removeToken();
            throw new Error('Не удалось обновить токен');
        }

        const data = await response.json();
        
        // Сохраняем новый access токен
        if (data.access_token) {
            saveToken(data.access_token);
            return data.access_token;
        }

        throw new Error('Access токен отсутствует в ответе');
    },

    // Верификация email
    verifyEmail: async (token: string): Promise<string> => {
        try {
            const response = await fetch(`http://45.8.250.236:8000/email/verify?token=${token}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({
                    detail: 'Ошибка верификации email'
                }));
                throw {
                    status_code: response.status,
                    detail: errorData.detail || `Ошибка ${response.status}`,
                };
            }
            
            // API возвращает просто строку, не JSON
            const text = await response.text();
            return text;
        } catch (error) {
            throw error;
        }
    },

    // Выход из системы
    logout: (): void => {
        removeToken();
    },
};

export default authService;

