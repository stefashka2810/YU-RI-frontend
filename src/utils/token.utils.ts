// Ключи для хранения токенов в localStorage
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const OLD_TOKEN_KEY = 'auth_token'; // Старый ключ для удаления

// Сохранить access токен в localStorage
export const saveToken = (token: string): void => {
    if (typeof window !== 'undefined') {
        // Удаляем старый токен если он есть
        localStorage.removeItem(OLD_TOKEN_KEY);
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    }
};

// Сохранить refresh токен в localStorage
export const saveRefreshToken = (token: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(REFRESH_TOKEN_KEY, token);
    }
};

// Получить access токен из localStorage
export const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        // Сначала проверяем новый ключ
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);
        if (token) return token;
        
        // Если нет, проверяем старый ключ и мигрируем
        const oldToken = localStorage.getItem(OLD_TOKEN_KEY);
        if (oldToken) {
            localStorage.setItem(ACCESS_TOKEN_KEY, oldToken);
            localStorage.removeItem(OLD_TOKEN_KEY);
            return oldToken;
        }
    }
    return null;
};

// Получить refresh токен из localStorage
export const getRefreshToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    }
    return null;
};

// Удалить оба токена из localStorage (при logout)
export const removeToken = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(OLD_TOKEN_KEY); // Удаляем и старый токен
    }
};

// Проверить, есть ли токен
export const isAuthenticated = (): boolean => {
    return !!getToken();
};

