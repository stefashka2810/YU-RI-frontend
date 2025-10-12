import Header from "@/components/layout/landing/header/Header";
import Footer from "@/components/layout/landing/footer/Footer";

export default function LandingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative" style={{ height: '360.6vw' }}>
            <div
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{
                    backgroundImage: "url('/landingImages/BG.png')",
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                }}
            />

            <div className="relative z-10 flex flex-col h-full">
                <Header/>
                <main className="flex-grow">
                    {children}
                </main>
                <Footer className="mt-auto"/>
            </div>
        </div>
    );
}
