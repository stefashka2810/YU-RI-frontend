import Link from "next/link";
import {ReactNode} from "react";
import {usePathname} from "next/navigation";

const AuthCard = ({children}: {children: ReactNode}) => {
    const pathName = usePathname();
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='flex flex-col border-2 rounded-[35px] p-[2.6vw] gap-[2.6vw]' style={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                borderColor: 'rgba(255, 255, 255, 0.5)',
                boxShadow: '66.23px 79.48px 82.77px 0px rgba(0, 0, 0, 0.07)',
            }}>
                <h1 className='flex flex-row text-[1.6vw] gap-[0.4vw]'>
                    <Link href='/login' className={pathName === '/login' ? 'text-black' : 'text-[#00000080]'}>
                        АВТОРИЗАЦИЯ
                    </Link>
                    <span> / </span>
                    <Link href='/register' className={pathName === '/register' ? 'text-black' : 'text-[#00000080]'}>
                        РЕГИСТРАЦИЯ
                    </Link>
                </h1>
                {children}
            </div>
        </div>
    )
}

export default AuthCard;