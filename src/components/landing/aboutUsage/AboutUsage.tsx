import Image from 'next/image'
const AboutUsage= () => {
    return (
        <>
            <article className = 'grid grid-rows-[13vw_auto] gap-[2vw] mt-[2.5vw] ml-[16.7vw] '>
                <div className='flex flex-col w-[38vw] justify-start'>
                    <div className='text-[2.5vw] font-medium'>{'как это работает'.toUpperCase()}
                        <div className='mt-[1.5vw] text-[1vw] font-normal'>
                            Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit
                            esse cillum dolore eu fugiat nulla pariatur
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-[28vw_1fr] h-auto items-start">
                    <div className='flex flex-col mt-[3.3vw] '>
                        <div className='relative min-h-[18vw] mb-[2vw]'>
                            <Image
                                src="/landingImages/01.png"
                                alt="1"
                                width={187}
                                height={225}
                                className="z-10 w-full max-w-[187px]"
                            />
                            <div className="absolute top-[7vw] left-0 w-full z-20 text-[0.8vw] ">
                                LOREM IPSUM DOLOR SIT AMET, CONSECTETUR
                                ADIPISCING ELIT, SED DO EIUSMOD TEMPOR INCIDIDUNT
                                UT LABORE ET DOLORE MAGNA ALIQUA. UT ENIM AD
                                MINIM VENIAM, QUIS NOSTRUD EXERCITATION ULLAMCO
                                LABORIS NISI UT ALIQUIP EX EA COMMODO CONSEQUAT.
                                DUIS AUTE IRURE DOLOR IN REPREHENDERIT IN
                                VOLUPTATE VELIT ESSE CILLUM DOLORE EU FUGIAT
                                NULLA PARIATUR.
                            </div>
                        </div>
                        <div className='relative min-h-[18vw] mb-[2vw]'>
                            <Image
                                src="/landingImages/02.png"
                                alt="1"
                                width={217}
                                height={255}
                                className="z-10"
                            />
                            <div className="absolute top-[6.5vw] left-0 w-full z-20 text-[0.8vw]">
                                LOREM IPSUM DOLOR SIT AMET, CONSECTETUR
                                ADIPISCING ELIT, SED DO EIUSMOD TEMPOR INCIDIDUNT
                                UT LABORE ET DOLORE MAGNA ALIQUA. UT ENIM AD
                                MINIM VENIAM, QUIS NOSTRUD EXERCITATION ULLAMCO
                                LABORIS NISI UT ALIQUIP EX EA COMMODO CONSEQUAT.
                                DUIS AUTE IRURE DOLOR IN REPREHENDERIT IN
                                VOLUPTATE VELIT ESSE CILLUM DOLORE EU FUGIAT
                                NULLA PARIATUR.
                            </div>

                        </div>

                        <div className='relative min-h-[18vw]'>
                            <Image
                                src="/landingImages/03.png"
                                alt="1"
                                width={217}
                                height={255}
                                className="z-10"
                            />
                            <div className="absolute top-[6.5vw] left-0 w-full z-20 text-[0.8vw]">
                                LOREM IPSUM DOLOR SIT AMET, CONSECTETUR
                                ADIPISCING ELIT, SED DO EIUSMOD TEMPOR INCIDIDUNT
                                UT LABORE ET DOLORE MAGNA ALIQUA. UT ENIM AD
                                MINIM VENIAM, QUIS NOSTRUD EXERCITATION ULLAMCO
                                LABORIS NISI UT ALIQUIP EX EA COMMODO CONSEQUAT.
                                DUIS AUTE IRURE DOLOR IN REPREHENDERIT IN
                                VOLUPTATE VELIT ESSE CILLUM DOLORE EU FUGIAT
                                NULLA PARIATUR.
                            </div>

                        </div>

                    </div>


                    <div className="sticky top-0 self-start">
                        <Image
                            src="/landingImages/computer.png"
                            alt="computer"
                            width={1000}
                            height={620}

                        />
                    </div>
                </div>
            </article>
            <section className="mt-[3.5vw] ml-[16.7vw] mr-[16.7vw]">
                <h2 className="text-[2.5vw] font-medium mb-[3vw]">
                    КОМУ ПОДОЙДЕТ СЕРВИС
                </h2>

                <div className="grid grid-cols-3 gap-[2.7vw]">
                    <div className="flex flex-col">
                        <div className="text-[1vw] font-medium mb-[0.5vw]">01</div>
                        <div className="text-[1.2vw] font-medium mb-[1.5vw]">КОМПАНИИ</div>
                        <p className="text-[0.8vw] leading-[1.4]">
                            LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD
                            TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. UT ENIM AD MINIM VENIAM,
                            QUIS NOSTRUD EXERCITATION ULLAMCO LABORIS NISI UT ALIQUIP EX EA COMMODO
                            CONSEQUAT. DUIS AUTE IRURE DOLOR IN REPREHENDERIT IN VOLUPTATE VELIT ESSE
                            CILLUM DOLORE EU FUGIAT NULLA PARIATUR.
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <div className="text-[1vw] font-medium mb-[0.5vw]">02</div>
                        <div className="text-[1.2vw] font-medium mb-[1.5vw]">ЮРИДИЧЕСКИЕ ЛИЦА</div>
                        <p className="text-[0.8vw] leading-[1.4]">
                            LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD
                            TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. UT ENIM AD MINIM VENIAM,
                            QUIS NOSTRUD EXERCITATION ULLAMCO LABORIS NISI UT ALIQUIP EX EA COMMODO
                            CONSEQUAT. DUIS AUTE IRURE DOLOR IN REPREHENDERIT IN VOLUPTATE VELIT ESSE
                            CILLUM DOLORE EU FUGIAT NULLA PARIATUR.
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <div className="text-[1vw] font-medium mb-[0.5vw]">03</div>
                        <div className="text-[1.2vw] font-medium mb-[1.5vw]">КОМПАНИИ</div>
                        <p className="text-[0.8vw] leading-[1.4]">
                            LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO EIUSMOD
                            TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA. UT ENIM AD MINIM VENIAM,
                            QUIS NOSTRUD EXERCITATION ULLAMCO LABORIS NISI UT ALIQUIP EX EA COMMODO
                            CONSEQUAT. DUIS AUTE IRURE DOLOR IN REPREHENDERIT IN VOLUPTATE VELIT ESSE
                            CILLUM DOLORE EU FUGIAT NULLA PARIATUR.
                        </p>
                    </div>
                </div>
            </section>
        </>

    )
}

export default AboutUsage;