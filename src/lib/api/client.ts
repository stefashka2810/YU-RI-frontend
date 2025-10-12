import { API_BASE_URL } from "./endpoints";
import { getToken } from "@/utils/token.utils";

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