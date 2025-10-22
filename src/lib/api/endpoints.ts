export const API_BASE_URL = "http://45.8.250.236:8000";

export const LOGIN_URL = `${API_BASE_URL}/auth/login`;
export const REGISTER_URL = `${API_BASE_URL}/auth/register`;
export const REFRESH_TOKEN_URL = `${API_BASE_URL}/auth/refresh`;
export const EMAIL_VERIFY_URL = `${API_BASE_URL}/email/verify`;

export const CHAT_BASE_URL = `${API_BASE_URL}/chat`;
export const CREATE_CHAT_URL = `${CHAT_BASE_URL}/chats`;
export const GET_CHATS_URL = `${CHAT_BASE_URL}/chats`;
export const POST_MESSAGE_URL = `${CHAT_BASE_URL}/messages`;
export const GET_CHAT_URL = (chatId: number) => `${CHAT_BASE_URL}/chats/${chatId}`;
export const GENERATE_AI_RESPONSE_URL = (chatId: number) => `${CHAT_BASE_URL}/messages/${chatId}/ai-response`;

export const PARSE_PDF_URL = `${API_BASE_URL}/parse/pdf`;