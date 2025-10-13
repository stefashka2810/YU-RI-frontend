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

    // Загрузить список чатов
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

    // Создать новый чат
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

    // Выбрать чат (загрузить с сообщениями)
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

    // Отправить сообщение
    const sendMessage = async (content: string, chatId?: number) => {
        const targetChatId = chatId || currentChat?.id;
        
        if (!targetChatId) {
            setError('Нет активного чата');
            return;
        }

        try {
            setIsLoading(true);
            const message = await chatService.postMessage(targetChatId, content);
            
            // Обновляем текущий чат с новым сообщением
            setCurrentChat(prev => {
                if (!prev || prev.id !== targetChatId) return prev;
                return {
                    ...prev,
                    messages: [...(prev.messages || []), message]
                };
            });
        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(errorMessage);
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

    // Загрузить чаты при монтировании
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

