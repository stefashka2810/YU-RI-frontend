'use client'
import { useEffect, useRef } from 'react';
import Image from 'next/image';

export interface Message {
    id: number;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

interface ChatMessagesProps {
    messages: Message[];
    isLoading?: boolean;
}

const ChatMessages = ({ messages, isLoading = false }: ChatMessagesProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className='w-full pl-[1vw] pr-[0.5vw] pb-[2vw] pt-[0.7vw] space-y-[1.5vw] relative z-20'>
            <div className='w-[65%] mx-auto'>
                {messages.map((message) => (
                    <div 
                        key={message.id}
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-[1.5vw]`}
                    >
                        <div 
                            className={`max-w-[90%] px-[1.5vw] py-[1vw] rounded-[15px] ${
                            message.isUser 
                                ? 'bg-[#353535] text-white' 
                                : 'bg-transparent text-white'
                        }`}
                        style={{
                            boxShadow: message.isUser 
                                ? '0px 0px 40px 0px rgba(255, 255, 255, 0.1)' 
                                : 'none'
                        }}
                    >
                        <div className='text-[0.95vw] leading-relaxed whitespace-pre-wrap'>
                            {message.text}
                            {
                            !message.isUser && (
                                <div className='flex flex-row gap-[0.7vw] mt-[0.7vw]'>
                                    <Image src='/chatImages/copy.png' alt='copy' width={20} height={20} />
                                    <Image src='/chatImages/update&image.png' alt='update&image' width={20} height={20} />
                                </div>
                            )
                        }
                        </div>
                        </div>
                        
                    </div>
                ))}
                
                {/* Индикатор загрузки ответа нейросети */}
                {isLoading && (
                    <div className="flex justify-start mb-[1.5vw]">
                        <div className="max-w-[90%]">
                            <div className="px-[1.5vw] py-[1vw] rounded-[15px] bg-transparent text-white">
                                <div className="flex items-center gap-[0.5vw]">
                                    <div className="flex space-x-[0.2vw]">
                                        <div className="w-[0.3vw] h-[0.3vw] bg-white rounded-full animate-bounce"></div>
                                        <div className="w-[0.3vw] h-[0.3vw] bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                        <div className="w-[0.3vw] h-[0.3vw] bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                    </div>
                                    <p className="text-[0.9vw] text-gray-300">Думаю...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};

export default ChatMessages;

