'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import chatService from '@/services/chat.service';
import { Chat } from '@/types/chat.types';
import { handleApiError } from '@/utils/error.utils';

interface ChatContextType {
    chats: Chat[];
    currentChat: Chat | null;
    isLoading: boolean;
    error: string | null;
    createNewChat: (title: string) => Promise<Chat | null>;
    loadChats: () => Promise<void>;
    selectChat: (chatId: number) => Promise<void>;
    sendMessage: (content: string, chatId?: number) => Promise<void>;
    generateAiResponse: (chatId?: number) => Promise<void>;
    parsePdf: (file: File) => Promise<string | null>;
    setCurrentChat: (chat: Chat | null) => void;
    clearError: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [currentChat, setCurrentChat] = useState<Chat | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadChats = async () => {
        try {
            setIsLoading(true);
            const chatsList = await chatService.getChats();
            setChats(chatsList);
        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const createNewChat = async (title: string): Promise<Chat | null> => {
        try {
            setIsLoading(true);
            const newChat = await chatService.createChat(title);
            setChats(prev => [newChat, ...prev]);
            setCurrentChat(newChat);
            return newChat;
        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(errorMessage);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const selectChat = async (chatId: number) => {
        try {
            setIsLoading(true);
            const chat = await chatService.getChat(chatId);
            setCurrentChat(chat);
        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = async (content: string, chatId?: number) => {
        const targetChatId = chatId || currentChat?.id;

        if (!targetChatId) {
            setError('Нет активного чата');
            return;
        }

        try {
            setIsLoading(true);
            
            console.log('Отправка сообщения:', content);
            
            const userMessage = await chatService.postMessage(targetChatId, content);
            
            console.log('Сообщение пользователя отправлено:', userMessage);
            
            setCurrentChat(prev => {
                if (!prev || prev.id !== targetChatId) return prev;
                return {
                    ...prev,
                    messages: [...(prev.messages || []), userMessage]
                };
            });

            try {
                await generateAiResponse(targetChatId);
            } catch (err) {
                console.warn('Ошибка при генерации ответа ИИ, продолжаем без него:', err);
            }

        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(errorMessage);
            setIsLoading(false);
        }
    };

    const generateAiResponse = async (chatId?: number) => {
        const targetChatId = chatId || currentChat?.id;

        if (!targetChatId) {
            setError('Нет активного чата');
            return;
        }

        try {
            console.log('Генерация ответа ИИ для чата:', targetChatId);
            console.log('Текущие сообщения в чате:', currentChat?.messages);
            
            const aiMessage = await chatService.generateAiResponse(targetChatId);
            
            console.log('Ответ ИИ получен:', aiMessage);
            console.log('Содержимое ответа:', aiMessage.content);
            
            if (aiMessage.content.includes('не могу обработать') ||
                aiMessage.content.includes('служба анализа временно недоступна')) {
                console.warn('Нейросеть вернула сообщение об ошибке:', aiMessage.content);
                setError(`Нейросеть недоступна: ${aiMessage.content}`);
                return;
            }
            
            setCurrentChat(prev => {
                if (!prev || prev.id !== targetChatId) return prev;
                return {
                    ...prev,
                    messages: [...(prev.messages || []), aiMessage]
                };
            });

        } catch (err: unknown) {
            console.error('Ошибка при генерации ответа ИИ:', err);
            
            const errorMessage = handleApiError(err);
            setError(`Ошибка генерации ответа: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    // Парсинг PDF
    const parsePdf = async (file: File): Promise<string | null> => {
        try {
            setIsLoading(true);
            const result = await chatService.parsePdf(file);
            return result.text || null;
        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(errorMessage);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const clearError = () => setError(null);

    useEffect(() => {
        loadChats();
    }, []);

    const value: ChatContextType = {
        chats,
        currentChat,
        isLoading,
        error,
        createNewChat,
        loadChats,
        selectChat,
        sendMessage,
        generateAiResponse,
        parsePdf,
        setCurrentChat,
        clearError,
    };

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};

