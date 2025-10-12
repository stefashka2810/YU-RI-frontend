import Image from 'next/image';

export default function ChatLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative h-screen overflow-hidden" >
            <div
                className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
                style={{
                    backgroundImage: "url('/authImages/BG.png')",
                    backgroundSize: '100% auto',
                    backgroundPosition: 'top center',
                    backgroundRepeat: 'no-repeat',
                }}
            />

            <div className="relative z-10 flex flex-col h-full">
                <Image
                    src='/authImages/14.png'
                    alt='figure'
                    width='400'
                    height='400'
                    className='absolute left-0 bottom-0'
                />
                <Image
                    src='/authImages/15.png'
                    alt='figure'
                    width='290'
                    height='290'
                    className='absolute top-1 left-[23vw]'
                />
                <Image
                    src='/authImages/16.png'
                    alt='figure'
                    width='200'
                    height='200'
                    className='absolute top-[23vw] right-[8vw]'
                />

                <main className="flex-grow relative z-20">
                    {children}
                </main>
            </div>
        </div>
    );
}
