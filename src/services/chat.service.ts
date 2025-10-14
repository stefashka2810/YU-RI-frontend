import apiRequest from "@/lib/api/client";
import { Chat, CreateChatRequest, Message, PostMessageRequest, ParsePdfResponse } from "@/types/chat.types";
import { getToken } from "@/utils/token.utils";
import { API_BASE_URL } from "@/lib/api/endpoints";

const chatService = {
    // Создать новый чат
    createChat: async (title: string): Promise<Chat> => {
        const data: CreateChatRequest = { title };
        const response = await apiRequest<Chat>('/chat/chats', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        return response;
    },

    // Получить список всех чатов
    getChats: async (): Promise<Chat[]> => {
        const response = await apiRequest<Chat[]>('/chat/chats', {
            method: 'GET',
        });
        return response;
    },

    // Получить конкретный чат с сообщениями
    getChat: async (chatId: number): Promise<Chat> => {
        const response = await apiRequest<Chat>(`/chat/chats/${chatId}`, {
            method: 'GET',
        });
        return response;
    },

    // Отправить сообщение
    postMessage: async (chatId: number, content: string, role: string = 'user'): Promise<Message> => {
        const data: PostMessageRequest = {
            chat_id: chatId,
            content,
            role
        };
        const response = await apiRequest<Message>('/chat/messages', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        return response;
    },

    // Генерировать ответ ИИ
    generateAiResponse: async (chatId: number): Promise<Message> => {
        console.log('🚀 Отправка запроса на генерацию ответа ИИ:', {
            url: `/chat/messages/${chatId}/ai-response`,
            method: 'POST',
            chatId
        });
        
        const response = await apiRequest<Message>(`/chat/messages/${chatId}/ai-response`, {
            method: 'POST',
        });
        
        console.log('📨 Ответ от API:', response);
        return response;
    },

    // Парсинг PDF файла
    parsePdf: async (file: File, lang?: string): Promise<ParsePdfResponse> => {
        const token = getToken();
        const formData = new FormData();
        formData.append('file', file);
        if (lang) {
            formData.append('lang', lang);
        }

        try {
            const response = await fetch(`${API_BASE_URL}/parse/pdf`, {
                method: 'POST',
                headers: {
                    ...(token && { 'Authorization': `Bearer ${token}` }),
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({
                    detail: 'Ошибка парсинга PDF'
                }));
                throw {
                    status_code: response.status,
                    detail: errorData.detail || `Ошибка ${response.status}`,
                };
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    },
};

export default chatService;

