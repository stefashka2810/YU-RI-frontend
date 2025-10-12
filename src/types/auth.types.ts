// Интерфейс для пользователя
export interface User {
    id: string;
    username: string;
    email: string;
    isEmailVerified: boolean;
}

// Данные для логина
export interface UserLogin {
    email: string;
    password: string;
}

// Данные для регистрации
export interface UserRegister {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

// Данные для верификации email
export interface EmailVerify {
    token: string;
}

// Ответ от API после успешной авторизации/регистрации
export interface AuthResponse {
    access_token: string;
    token_type: string;
    user: User;
}

// Ответ с ошибкой от API
export interface ApiError {
    detail: string | ValidationError[] | { msg: string };
    status_code?: number;
}

// Структура ошибки валидации от FastAPI
export interface ValidationError {
    type: string;
    loc: (string | number)[];
    msg: string;
    input?: any;
    ctx?: any;
    url?: string;
}
