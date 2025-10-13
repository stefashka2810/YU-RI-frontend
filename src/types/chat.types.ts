// Типы для чата

export interface Message {
    id: number;
    chat_id: number;
    role: string;
    content: string;
    created_at: string;
}

export interface Chat {
    id: number;
    title: string;
    owner_id: number;
    created_at: string;
    updated_at: string;
    last_message_at: string;
    messages?: Message[];
}

export interface CreateChatRequest {
    title: string;
}

export interface PostMessageRequest {
    chat_id: number;
    content: string;
    role: string;
}

export interface ParsePdfResponse {
    text?: string;
    metadata?: {
        pages?: number;
        size?: number;
        parse_duration?: number;
    };
}

