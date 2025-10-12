'use client'
import ChatInput from "@/components/chat/chatInput/ChatInput";
import ChatSidebar from "@/components/chat/chatSidebar/ChatSidebar";
import ChatHeader from "@/components/chat/chatHeader/ChatHeader";
import ChatMessages, { Message } from "@/components/chat/chatMessages/ChatMessages";
import DocumentEditor from "@/components/chat/documentEditor/DocumentEditor";
import { useState } from "react";

// Моковые ответы от бота
const MOCK_RESPONSES = [
    "Согласно статье 304 ГК РФ, собственник может требовать устранения всяких нарушений его права, хотя бы эти нарушения и не были соединены с лишением владения.",
    "Для решения данного вопроса необходимо обратиться в суд с исковым заявлением. Рекомендую собрать все доказательства нарушения.",
    "В вашем случае применима статья 15 ГК РФ о возмещении убытков. Вам необходимо подготовить расчет причиненного ущерба.",
    "Согласно Трудовому кодексу РФ, работодатель обязан выплатить все причитающиеся суммы в день увольнения.",
    "Рекомендую направить досудебную претензию. Это обязательный этап перед обращением в суд по большинству споров."
];

const ChatPage = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [attachedFile, setAttachedFile] = useState<File | null>(null);

    const handleSendMessage = (text: string, file?: File) => {
        if (!text && !file) return;

        // Добавляем сообщение пользователя
        const userMessage: Message = {
            id: Date.now(),
            text: text || (file ? `Отправлен файл: ${file.name}` : ''),
            isUser: true,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);

        // Имитация ответа бота через 1 секунду
        setTimeout(() => {
            const randomResponse = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
            const botMessage: Message = {
                id: Date.now(),
                text: randomResponse,
                isUser: false,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMessage]);
        }, 1000);
    };

    return (
        <div className="flex h-full">
            <ChatSidebar />
            
            {/* Контейнер с чатом и редактором - фиксированная ширина 68vw */}
            <div className="w-[68vw] flex flex-row h-full gap-[1vw]">
                {/* Область чата */}
                <div className={`flex flex-col h-full transition-all duration-300 ${isEditorOpen ? 'w-[calc(50%)]' : 'w-full'}`}>
                    {/* Header */}
                    <ChatHeader onOpenEditor={() => setIsEditorOpen(true)} isEditorOpen={isEditorOpen} />
                    
                    {/* Если нет сообщений - показываем инпут по центру */}
                    {messages.length === 0 ? (
                        <div className="flex-1 flex items-center pb-[4vw]">
                            <div className="w-full pl-[2.4vw]">
                                <div className="w-[65%] mx-auto">
                                    <ChatInput 
                                        onSendMessage={handleSendMessage}
                                        onFileAttach={(file) => {
                                            setAttachedFile(file);
                                            setIsEditorOpen(true);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Если есть сообщения - показываем переписку + инпут внизу */
                        <div className="flex-1 flex flex-col overflow-hidden -mt-[4vw]">
                            <div 
                                className="flex-1 overflow-y-auto"
                                style={{
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',
                                }}
                            >
                                <style jsx>{`
                                    div::-webkit-scrollbar {
                                        display: none;
                                    }
                                `}</style>
                                <ChatMessages messages={messages} />
                            </div>
                            <div className="flex-shrink-0 w-full pb-[1.5vw] pl-[2.4vw]">
                                <div className="w-[65%] mx-auto">
                                    <ChatInput 
                                        onSendMessage={handleSendMessage}
                                        onFileAttach={(file) => {
                                            setAttachedFile(file);
                                            setIsEditorOpen(true);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Область редактора */}
                {isEditorOpen && (
                    <div className="w-[calc(50%)] h-full pl-[1vw] pt-[2.3vw] pb-[1.2vw] pr-[0.3vw]">
                        <DocumentEditor 
                            file={attachedFile}
                            onClose={() => {
                                setIsEditorOpen(false);
                                setAttachedFile(null);
                            }}
                            onFileSelect={setAttachedFile}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatPage;