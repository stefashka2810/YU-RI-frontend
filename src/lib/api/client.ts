import { API_BASE_URL } from "./endpoints";
import { getToken, saveToken, removeToken, getRefreshToken } from "@/utils/token.utils";

// Флаг для предотвращения множественных одновременных refresh запросов
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

// Функция обновления токена
async function refreshAccessToken(): Promise<string> {
    const refreshToken = getRefreshToken();
    
    if (!refreshToken) {
        removeToken();
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
        // Редирект на страницу логина
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
        throw new Error('Не удалось обновить токен');
    }

    const data = await response.json();
    
    if (data.access_token) {
        saveToken(data.access_token);
        return data.access_token;
    }

    throw new Error('Access токен отсутствует в ответе');
}

// Универсальная функция для всех API запросов
async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getToken();
    
    const config: RequestInit = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers,
        },
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        
        // Если получили 401 (Unauthorized) - пробуем обновить токен
        if (response.status === 401) {
            // Если уже идет процесс refresh - ждем его завершения
            if (isRefreshing && refreshPromise) {
                const newToken = await refreshPromise;
                // Повторяем запрос с новым токеном
                const retryConfig = {
                    ...config,
                    headers: {
                        ...config.headers,
                        'Authorization': `Bearer ${newToken}`,
                    },
                };
                const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, retryConfig);
                
                if (!retryResponse.ok) {
                    const errorData = await retryResponse.json().catch(() => ({
                        detail: 'Произошла ошибка при выполнении запроса'
                    }));
                    throw {
                        status_code: retryResponse.status,
                        detail: errorData.detail || `Ошибка ${retryResponse.status}`,
                    };
                }
                
                return await retryResponse.json();
            }

            // Начинаем процесс refresh
            isRefreshing = true;
            refreshPromise = refreshAccessToken();

            try {
                const newToken = await refreshPromise;
                
                // Повторяем исходный запрос с новым токеном
                const retryConfig = {
                    ...config,
                    headers: {
                        ...config.headers,
                        'Authorization': `Bearer ${newToken}`,
                    },
                };
                const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, retryConfig);
                
                if (!retryResponse.ok) {
                    const errorData = await retryResponse.json().catch(() => ({
                        detail: 'Произошла ошибка при выполнении запроса'
                    }));
                    throw {
                        status_code: retryResponse.status,
                        detail: errorData.detail || `Ошибка ${retryResponse.status}`,
                    };
                }
                
                return await retryResponse.json();
            } finally {
                isRefreshing = false;
                refreshPromise = null;
            }
        }
        
        // Проверяем успешность запроса
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                detail: 'Произошла ошибка при выполнении запроса'
            }));
            throw {
                status_code: response.status,
                detail: errorData.detail || `Ошибка ${response.status}`,
            };
        }

        // Возвращаем данные
        return await response.json();
    } catch (error) {
        // Пробрасываем ошибку дальше для обработки в сервисах
        throw error;
    }
}

// Экспортируем функцию для использования в сервисах
export default apiRequest;