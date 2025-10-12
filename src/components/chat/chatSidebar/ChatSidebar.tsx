'use client'
import { useState } from 'react'
import Image from 'next/image'

const INITIAL_CHATS = [
    { id: 1, title: 'Как засудить соседа?' },
    { id: 4, title: 'Дорогой дневник, мне не под...' },
    { id: 5, title: 'Как засудить соседа?' },
    { id: 6, title: 'Как засудить соседа?' },
    { id: 7, title: 'Как засудить соседа?' },
] as const;

const ChatSidebar = () => {
    const [chats] = useState(INITIAL_CHATS);

    return (
        <div className="w-[15.6vw] flex flex-col gap-6 p-[1vw] mt-[1vw]">
            <button className="w-full text-[0.75vw] font-medium bg-[#FFFFFF4D] rounded-[100px] py-[0.7vw] border-1 border-[#FFFFFFCC] text-white flex items-center justify-center gap-1
             hover:bg-[#454545] hover:cursor-pointer transition-all">
                <span><Image src='/chatImages/Plus.png' alt='plus' width={16} height={16} /></span> ДОБАВИТЬ ЧАТ
            </button>

            <div className="flex flex-col gap-[0.4vw]">
                {chats.map((chat) => (
                    <div 
                        key={chat.id}
                        className="bg-transparent rounded-[10px] p-3 text-white text-[0.75vw] border border-transparent hover:border-[#FFFFFF33] cursor-pointer transition-all"
                    >
                        {chat.title}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChatSidebar;
