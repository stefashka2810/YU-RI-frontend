import Image from "next/image";

const AboutContent = () => {
    return (
        <section className='grid grid-cols-[34vw_50vw]'>
            <Image src='/landingImages/14.png' alt='ball' width={490} height={490} style={{
                left: '-19vw',
            }} />
            <div className='flex flex-row justify-start mt-[18vw]'>
                    <div className='text-[2.5vw] font-medium'>{'о сервисе'.toUpperCase()}
                        <div className='mt-[1vw] text-[1.7vw] font-normal'>
                            Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                            ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit 
                            esse cillum dolore eu fugiat nulla pariatur
                        </div>
                    </div>
            </div>


        </section>
    )
}

export default AboutContent;