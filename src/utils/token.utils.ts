// Ключ для хранения токена в localStorage
const TOKEN_KEY = 'auth_token';

// Сохранить токен в localStorage
export const saveToken = (token: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(TOKEN_KEY, token);
    }
};

// Получить токен из localStorage
export const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(TOKEN_KEY);
    }
    return null;
};

// Удалить токен из localStorage (при logout)
export const removeToken = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_KEY);
    }
};

// Проверить, есть ли токен
export const isAuthenticated = (): boolean => {
    return !!getToken();
};

