'use client'
import { useState } from 'react'
import Image from 'next/image'

interface ChatHeaderProps {
    onOpenEditor: () => void;
    isEditorOpen: boolean;
}

const ChatHeader = ({ onOpenEditor, isEditorOpen }: ChatHeaderProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-row items-center justify-between mt-[1vw] pl-[1vw] py-[1vw] pr-[1vw] w-full bg-transparent relative z-30">
            <div className="flex flex-row items-center gap-[0.5vw]">
                <button 
                    className="flex flex-row items-center gap-[0.5vw] bg-[#FFFFFF1A] border-1 border-[#FFFFFF1A] rounded-[10px] px-[1vw] py-[0.5vw] text-white text-[0.9vw] hover:bg-[#252525] hover:cursor-pointer whitespace-nowrap"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    Юридические вопросы
                    <Image 
                        src="/chatImages/Vector.png"
                        alt="arrow"
                        width={12}
                        height={12}
                        className={`transform ${isOpen ? 'rotate-180' : ''} transition-transform`}
                    />
                </button>
            </div>

            <button 
                className="bg-[#FFFFFF1A] rounded-[10px] px-[1vw] py-[0.5vw] border-1 border-[#FFFFFF1A] text-white text-[0.9vw] hover:bg-[#252525] hover:cursor-pointer whitespace-nowrap"
                onClick={onOpenEditor}
            >
                {isEditorOpen ? 'Закрыть редактор' : 'Открыть редактор'}
            </button>
        </div>
    )
}

export default ChatHeader
