import Header from "@/components/layout/chat/header/Header";
import Image from "next/image";

export default function ChatLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative bg-black h-screen overflow-hidden" >
            <div
                className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
                style={{
                    backgroundImage: "url('/chatImages/BG.png')",
                    backgroundSize: '100% auto',
                    backgroundPosition: 'top center',
                    backgroundRepeat: 'no-repeat',
                }}
            />

            <div className="relative z-10 flex flex-col h-full">
                <Header/>
                <main className="flex-grow overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
