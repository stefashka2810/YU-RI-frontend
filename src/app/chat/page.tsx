'use client'
import ChatInput from "@/components/chat/chatInput/ChatInput";
import ChatSidebar from "@/components/chat/chatSidebar/ChatSidebar";
import ChatHeader from "@/components/chat/chatHeader/ChatHeader";
import ChatMessages from "@/components/chat/chatMessages/ChatMessages";
import DocumentEditor from "@/components/chat/documentEditor/DocumentEditor";
import { useState } from "react";
import { useChat } from "@/hooks/useChat";
import { Editor } from "@/components/chat/documentEditor/DocumentEditor";

const ChatPage = () => {
    const { currentChat, sendMessage, parsePdf, createNewChat, isLoading } = useChat();
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [attachedFile, setAttachedFile] = useState<File | null>(null);
    
    // Используем CSS переменные для корректной работы ширины
    const chatWidth = isEditorOpen ? 32 : 43;
    const chatWidthStyle = { width: `${chatWidth}vw` };

    // Преобразуем сообщения из API в формат компонента
    const messages = currentChat?.messages?.map(msg => ({
        id: msg.id,
        text: msg.content,
        isUser: msg.role === 'user',
        timestamp: new Date(msg.created_at),
    })) || [];

    const handleSendMessage = async (text: string, file?: File) => {
        let messageText = text;

        console.log('handleSendMessage вызван:', { text, file: file?.name });

        // Если есть файл - парсим его
        if (file) {
            if (file.type === 'application/pdf') {
                // PDF файл
                console.log('Парсинг PDF файла...');
                const parsedText = await parsePdf(file);
                if (parsedText) {
                    messageText = text ? `${text}\n\nТекст из PDF:\n${parsedText}` : parsedText;
                }
            } else if (file.name.endsWith('.docx')) {
                // DOCX файл - парсим с помощью mammoth
                console.log('Парсинг DOCX файла...');
                try {
                    const arrayBuffer = await file.arrayBuffer();
                    const mammoth = (await import('mammoth')).default;
                    const result = await mammoth.convertToHtml({ arrayBuffer });
                    const parsedText = result.value.replace(/<[^>]*>/g, ''); // Убираем HTML теги
                    console.log('DOCX распарсен, длина текста:', parsedText.length);
                    messageText = text ? `${text}\n\nТекст из документа:\n${parsedText}` : parsedText;
                } catch (error) {
                    console.error('Ошибка при парсинге DOCX:', error);
                    messageText = text || 'Ошибка при чтении документа';
                }
            } else if (file.name.endsWith('.doc')) {
                // DOC файл - пока просто отправляем название файла
                console.log('DOC файл, отправляем название');
                messageText = text ? `${text}\n\nПрикреплен файл: ${file.name}` : `Прикреплен файл: ${file.name}`;
            }
        }

        console.log('Итоговый текст сообщения:', messageText);

        if (!messageText) {
            console.warn('Пустое сообщение, отмена отправки');
            return;
        }

        // Если нет активного чата - создаем новый
        if (!currentChat) {
            console.log('Нет активного чата, создаем новый');
            // Название чата = первые 50 символов сообщения
            const chatTitle = messageText.length > 50 
                ? messageText.substring(0, 50) + '...' 
                : messageText;
            
            // Создаем чат и получаем его
            const newChat = await createNewChat(chatTitle);
            
            // Отправляем сообщение в созданный чат
            if (newChat) {
                console.log('Новый чат создан, ID:', newChat.id);
                await sendMessage(messageText, newChat.id);
            } else {
                console.error('Не удалось создать новый чат');
            }
        } else {
            console.log('Отправка в существующий чат, ID:', currentChat.id);
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
                                <div className="w-full pl-[0.9vw]">
                                    <div className="mx-auto" style={chatWidthStyle}>
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
                                            <ChatMessages 
                                                messages={messages} 
                                                isLoading={isLoading} 
                                                isEditorOpen={isEditorOpen}
                                                onRegenerateMessage={(messageId) => {
                                                    console.log('Повторная генерация для сообщения:', messageId);
                                                    // Здесь можно добавить логику повторной генерации
                                                }}
                                            />
                                </div>
                                <div className="flex-shrink-0 w-full pb-[1.5vw] pl-[0.9vw]">
                                    <div className="mx-auto" style={chatWidthStyle}>
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
                    <div className="flex-1 flex w-full items-center justify-center pb-[4vw]">
                        <div style={chatWidthStyle}>
                            <ChatInput
                                onSendMessage={handleSendMessage}
                                onFileAttach={(file) => {
                                    setAttachedFile(file);
                                    setIsEditorOpen(true);
                                }}
                            />

                        </div>
                    </div>
                )}
                </div>

                {/* Область редактора */}
                {isEditorOpen && (
                    <div className="w-[calc(50%)] h-full pl-[1vw] pt-[2.3vw] pb-[1.2vw] pr-[0.3vw] animate-slideInRight">
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
            <div>

                {isEditorOpen && <div className='animate-slideInLeft'>
                    <Editor/>
                </div>}
            </div>

        </div>
    )
}

export default ChatPage;