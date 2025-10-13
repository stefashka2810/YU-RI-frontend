import Image from "next/image";

const Header = () => {
    return (
        <header className="flex flex-row w-full justify-between pl-[16.7vw] pt-[1vw] pb-[0.5vw] pr-[16.7vw]">
            <Image src='/chatImages/yU-RI.png' alt='logo' width={79} height={20} className='hover:cursor-pointer' />
            <Image src='/chatImages/menu.png' alt='menu' width={21} height={21} className='hover:cursor-pointer' />
        </header>
    )
}

export default Header;