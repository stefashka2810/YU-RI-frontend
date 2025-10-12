import { ApiError } from "@/types/auth.types";

// Преобразование ошибок API в понятные сообщения
export const handleApiError = (error: unknown): string => {
    // Если это наша структура ошибки
    if (error && typeof error === 'object' && 'detail' in error) {
        const apiError = error as ApiError;
        
        // Если detail это массив (FastAPI validation errors)
        if (Array.isArray(apiError.detail)) {
            const firstError = apiError.detail[0];
            if (firstError && typeof firstError === 'object' && 'msg' in firstError) {
                return String(firstError.msg);
            }
            return 'Ошибка валидации данных.';
        }
        
        // Если detail это объект (FastAPI validation error)
        if (typeof apiError.detail === 'object' && apiError.detail !== null && 'msg' in apiError.detail) {
            return String((apiError.detail as any).msg);
        }
        
        // Если detail это строка
        const detailStr = typeof apiError.detail === 'string' ? apiError.detail : '';
        
        // Обрабатываем разные статус-коды
        switch (apiError.status_code) {
            case 400:
                return detailStr || 'Неверные данные. Проверьте введенную информацию.';
            case 401:
                return detailStr || 'Неверный email или пароль.';
            case 403:
                return detailStr || 'Доступ запрещен.';
            case 404:
                return detailStr || 'Запрашиваемый ресурс не найден.';
            case 409:
                return detailStr || 'Пользователь с таким email уже существует.';
            case 422:
                return detailStr || 'Ошибка валидации данных.';
            case 500:
                return detailStr || 'Ошибка сервера. Попробуйте позже.';
            default:
                return detailStr || 'Произошла ошибка. Попробуйте позже.';
        }
    }
    
    // Если это сетевая ошибка
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
        return 'Ошибка подключения к серверу. Проверьте интернет-соединение.';
    }
    
    // Общая ошибка
    return 'Произошла неизвестная ошибка. Попробуйте позже.';
};

