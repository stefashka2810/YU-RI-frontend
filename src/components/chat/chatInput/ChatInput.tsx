'use client'
import Image from 'next/image'
import { useState, KeyboardEvent } from 'react'

interface ChatInputProps {
    onSendMessage: (message: string, file?: File) => void;
    onFileAttach?: (file: File) => void;
}

const ChatInput = ({ onSendMessage, onFileAttach }: ChatInputProps) => {
    const [input, setInput] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleSend = () => {
        if (input.trim() || file) {
            onSendMessage(input.trim(), file || undefined);
            setInput('');
            setFile(null);
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div 
            className='flex flex-col bg-[#353535] rounded-[20px] w-full px-[1.5vw] pt-[1.6vw] pb-[1vw] gap-[0.7vw]'
            style={{
                boxShadow: '0px 0px 130px 0px rgba(255, 255, 255, 0.2)'
            }}
        >
            <div className='flex flex-row items-center justify-between'>
                <input 
                    type='text' 
                    placeholder='Введите ваш запрос'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className='flex-grow bg-transparent text-white outline-none text-[1vw] placeholder:text-gray-400'
                /> 
                <button 
                    onClick={handleSend}
                    className="hover:opacity-80 hover:cursor-pointer transition-opacity"
                >
                    <Image
                        src='/chatImages/Send.png'
                        alt='send'
                        width={24}
                        height={24}
                    />
                </button>
            </div>

            <div className='flex flex-row items-center'>
                <label className="hover:opacity-80 hover:cursor-pointer flex flex-row items-center gap-[0.1vw] pr-[0.3vw] py-[0.2vw] border border-[#FFFFFF33] rounded-[8px] text-white text-[0.9vw]">
                    <Image
                        src='/chatImages/FileIcon.png'
                        alt='attach'
                        width={24}
                        height={24}
                    />
                    {file ? file.name : 'Прикрепить'}
                    <input 
                        type='file'
                        accept='image/*,.pdf,.doc,.docx,.csv,.txt'
                        className='hidden'
                        onChange={(e) => {
                            const selectedFile = e.target.files?.[0];
                            if (selectedFile) {
                                setFile(selectedFile);
                                if (onFileAttach) {
                                    onFileAttach(selectedFile);
                                }
                            }
                        }}
                    /> 
                </label>
            </div>
        </div>
    )
}

export default ChatInput;