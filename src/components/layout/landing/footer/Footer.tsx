import Image from "next/image";
import Link from "next/link";

interface FooterProps {
    className?: string;
}

const Footer = ({ className = '' }: FooterProps) => {
    return (
        <footer className={`flex flex-row w-full justify-between px-[16.7vw] py-[1vw] ${className}`}>
            <Image src='/landingImages/yU-RI.png' alt='logo' width={64} height={5} className='hover:cursor-pointer' />
            <div className='flex flex-row gap-[1vw] '>
                <Link href='/landing' className='text-[0.8vw]'>Главная</Link>
                <Link href='/register' className='text-[0.8vw]'>Регистрация</Link>
                <Link href='/chat' className='text-[0.8vw]'>Чат</Link>
            </div>
        </footer>
    )
}

export default Footer;