import Image from 'next/image'
const AboutUsage= () => {
    return (
        <>
            <article className = 'grid grid-rows-[13vw_auto] gap-[2vw] mt-[2.5vw] ml-[16.7vw] '>
                <div className='flex flex-col w-[38vw] justify-start'>
                    <div className='text-[2.5vw] font-medium'>{'как это работает'.toUpperCase()}
                        <div className='mt-[1vw] text-[2vw] font-normal'>
                            В ТРЕХ ШАГАХ
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-[28vw_1fr] h-auto items-start gap-[2vw]">
                    <div className='flex flex-col'>
                        <div className='relative min-h-[18vw] mb-[2vw]'>
                            <Image
                                src="/landingImages/01.png"
                                alt="1"
                                width={187}
                                height={225}
                                className="z-10 w-full max-w-[187px]"
                            />
                            <div className="absolute top-[7vw] left-0 w-full z-20 text-[1vw] ">
                                ЗАГРУЗКА ДОКУМЕНТА
                                <div className='mt-[0.8vw]'>
                                    ЗАГРУЗИТЕ ДОКУМЕНТ В ФОРМАТЕ WORD, PDF ИЛИ СКАН — СИСТЕМА АВТОМАТИЧЕСКИ РАСПОЗНАЁТ ТЕКСТ.
                                </div>
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
                            <div className="absolute top-[6.5vw] left-0 w-full z-20 text-[1vw]">
                                АНАЛИЗ И ПОДСВЕТКА РИСКОВ
                                <div className='mt-[0.8vw]'>
                                    МЫ АНАЛИЗИРУЕМ СТРУКТУРУ И СОДЕРЖАНИЕ, ПОДСВЕЧИВАЕМ ПРОБЛЕМНЫЕ МЕСТА (ДИСБАЛАНС ИНТЕРЕСОВ, ОТСУТСТВУЮЩИЕ ПУНКТЫ И ПР.), ДАЁМ КРАТКУЮ АННОТАЦИЮ.
                                </div>
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
                            <div className="absolute top-[6.5vw] left-0 w-full z-20 text-[1vw]">
                                ГЕНЕРАЦИЯ И РЕДАКТИРОВАНИЕ В ЧАТЕ
                                <div className='mt-[0.8vw]'>
                                    СГЕНЕРИРУЙТЕ НОВЫЙ ШАБЛОН ИЛИ ОТРЕДАКТИРУЙТЕ ДОКУМЕНТ ПРЯМО В ЧАТЕ: ПРАВКИ СОХРАНЯЮТСЯ, ВЕРСИЯ ПОД КЛИЕНТА ФОРМИРУЕТСЯ АВТОМАТИЧЕСКИ.
                                </div>
                            </div>

                        </div>

                    </div>


                    <div className="sticky top-0 self-start -mt-[3.5vw]">
                        <Image
                            src="/landingImages/computer.png"
                            alt="computer"
                            width={1000}
                            height={620}
                            className="max-w-full h-auto"
                        />
                    </div>
                </div>
            </article>
            <section className="mt-[6.5vw] ml-[16.4vw] mr-[16.7vw]">
                <h2 className="text-[2.5vw] font-medium mb-[3vw]">
                    КОМУ ПОДОЙДЕТ СЕРВИС
                </h2>

                <div className="grid grid-cols-3 gap-[2.5vw]">
                    <div className="flex flex-col">
                        <div className="text-[1vw] font-medium mb-[0.5vw]">01</div>
                        <div className="text-[1.2vw] font-medium mb-[1.5vw]">ЮРИСТАМ</div>
                        <p className="text-[0.8vw] leading-[1.4]">
                            СНИЗЬТЕ ВРЕМЯ НА РУТИННЫЕ ПРОВЕРКИ ТИПОВЫХ ДОГОВОРОВ, УВЕЛИЧЬТЕ ПРОПУСКНУЮ СПОСОБНОСТЬ И КАЧЕСТВО ВЫДАЧИ.
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <div className="text-[1vw] font-medium mb-[0.5vw]">02</div>
                        <div className="text-[1.2vw] font-medium mb-[1.5vw]">БИЗНЕСУ</div>
                        <p className="text-[0.8vw] leading-[1.4]">
                            ПРОВЕРЯЙТЕ КОНТРАКТЫ ПЕРЕД ПОДПИСАНИЕМ, ПОЛУЧАЙТЕ ПРОСТЫЕ ПОЯСНЕНИЯ К ЮРИДИЧЕСКИМ ТЕРМИНАМ И ЭКОНОМЬТЕ НА ВНЕШНЕМ СОПРОВОЖДЕНИИ.                        </p>
                    </div>

                    <div className="flex flex-col">
                        <div className="text-[1vw] font-medium mb-[0.5vw]">03</div>
                        <div className="text-[1.2vw] font-medium mb-[1.5vw]">КРУПНЫМ КОМПАНИЯМ</div>
                        <p className="text-[0.8vw] leading-[1.4]">
                            ПОВЕРХ БАЗОВОГО ФУНКЦИОНАЛА ВНЕДРЯЕМ КАСТОМНОГО ИИ-АГЕНТА, ОБУЧАЕМОГО НА ВНУТРЕННИХ ПРОЦЕССАХ КОМПАНИИ: АВТОМАТИЧЕСКИЙ МОНИТОРИНГ РИСКОВ, СООТВЕТСТВИЕ КОРПОРАТИВНОЙ ПОЛИТИКЕ И СТАНДАРТИЗАЦИЯ ПРОВЕРОК.
                        </p>
                    </div>
                </div>
            </section>
        </>

    )
}

export default AboutUsage;