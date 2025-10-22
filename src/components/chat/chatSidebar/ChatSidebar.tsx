'use client'
import Image from 'next/image'
import { useChat } from '@/hooks/useChat'

const ChatSidebar = () => {
    const { chats, currentChat, selectChat, setCurrentChat} = useChat();

    const handleNewChat = () => {
        setCurrentChat(null);
    };

    return (
        <div className="w-[15.6vw] flex flex-col gap-6 p-[1vw] mt-[1vw]">
            <div onClick={(e) => e.stopPropagation()}>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleNewChat();
                    }}
                    className="w-full text-[0.9vw] font-medium bg-[#FFFFFF4D] rounded-[100px] py-[0.7vw] border-1 border-[#FFFFFFCC] text-white flex items-center justify-center gap-1 hover:bg-[#454545] hover:cursor-pointer transition-all"
                >
                    <span><Image src='/chatImages/Plus.png' alt='plus' width={16} height={16} /></span>ДОБАВИТЬ ЧАТ
                </button>
            </div>

            <div 
                className="flex flex-col gap-[0.4vw] overflow-y-auto"
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
                {chats.map((chat) => (
                    <div 
                        key={chat.id}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            selectChat(chat.id);
                        }}
                        className={`rounded-[10px] p-3 text-white text-[0.9vw] border cursor-pointer transition-all ${
                            currentChat?.id === chat.id 
                                ? 'border-[#FFFFFF1A] bg-[#FFFFFF1A]' 
                                : 'border-transparent hover:border-[#FFFFFF1A]'
                        }`}
                    >
                        <div className="truncate" onClick={(e) => e.stopPropagation()}>{chat.title}</div>
                
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChatSidebar;
