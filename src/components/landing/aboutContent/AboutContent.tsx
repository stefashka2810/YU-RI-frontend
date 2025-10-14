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
                            YU-RI ПОМОГАЕТ ПРОВЕРЯТЬ, ГЕНЕРИРОВАТЬ И ПРАВИТЬ ДОКУМЕНТЫ: ПОДСВЕТКА РИСКОВ И АНАЛИТИКА. ЭКОНОМИЯ ВРЕМЕНИ И СНИЖЕНИЕ ЮРИДИЧЕСКИХ РИСКОВ.
                        </div>
                    </div>
            </div>


        </section>
    )
}

export default AboutContent;