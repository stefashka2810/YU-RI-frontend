'use client'
import ChatInput from "@/components/chat/chatInput/ChatInput";
import ChatSidebar from "@/components/chat/chatSidebar/ChatSidebar";
import ChatHeader from "@/components/chat/chatHeader/ChatHeader";
import ChatMessages from "@/components/chat/chatMessages/ChatMessages";
import DocumentEditor from "@/components/chat/documentEditor/DocumentEditor";
import { useState } from "react";
import { useChat } from "@/hooks/useChat";

const ChatPage = () => {
    const { currentChat, sendMessage, parsePdf, createNewChat } = useChat();
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [attachedFile, setAttachedFile] = useState<File | null>(null);

    // Преобразуем сообщения из API в формат компонента
    const messages = currentChat?.messages?.map(msg => ({
        id: msg.id,
        text: msg.content,
        isUser: msg.role === 'user',
        timestamp: new Date(msg.created_at),
    })) || [];

    const handleSendMessage = async (text: string, file?: File) => {
        let messageText = text;

        // Если есть файл PDF - парсим его
        if (file && file.type === 'application/pdf') {
            const parsedText = await parsePdf(file);
            if (parsedText) {
                messageText = text ? `${text}\n\nТекст из PDF:\n${parsedText}` : parsedText;
            }
        }

        if (!messageText) return; // Нельзя отправить пустое сообщение

        // Если нет активного чата - создаем новый
        if (!currentChat) {
            // Название чата = первые 50 символов сообщения
            const chatTitle = messageText.length > 50 
                ? messageText.substring(0, 50) + '...' 
                : messageText;
            
            // Создаем чат и получаем его
            const newChat = await createNewChat(chatTitle);
            
            // Отправляем сообщение в созданный чат
            if (newChat) {
                await sendMessage(messageText, newChat.id);
            }
        } else {
            await sendMessage(messageText);
        }
    };

    return (
        <div className="flex h-full">
            <ChatSidebar />
            
            {/* Контейнер с чатом и редактором - фиксированная ширина 68vw */}
            <div className="w-[68vw] flex flex-row h-full gap-[1vw]">
                {/* Область чата */}
                <div className={`flex flex-col h-full transition-all duration-300 ${isEditorOpen ? 'w-[calc(50%)]' : 'w-full'}`}>
                    {/* Header */}
                    <ChatHeader onOpenEditor={() => setIsEditorOpen(!isEditorOpen)} isEditorOpen={isEditorOpen} />
                    
                    {currentChat ? (
                        <>
                        
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
                                <div className="flex-shrink-0 w-full pb-[1.5vw] pl-[1vw]">
                                    <div className="w-[55%] mx-auto">
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
                    </>
                ) : (
                    /* Если нет выбранного чата - показываем инпут как в ChatGPT */
                    <div className="flex-1 flex items-center pb-[4vw]">
                        <div className="w-full pl-[1vw]">
                            <div className="w-[55%] mx-auto">
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