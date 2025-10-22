import Image from "next/image";

const AboutPrices = () => {
    return (
        <section className="mt-[7vw] ml-[15vw] mr-[15vw] w-auto">
            <h2 className="text-[2.2vw] font-medium tracking-wide mb-[1.5vw]">
                ЦЕНЫ
            </h2>

            <div className="grid grid-cols-[23vw_21vw_23vw] items-stretch">
                <div className="relative flex flex-col h-full p-[1vw] bg-gradient-to-t from-[#0B0B0B] via-[#1A1A1A] to-[#7F7F7F] text-white">
                    <div className="flex-1 z-10"> {/* Добавляем z-10 чтобы контент был над картинкой */}
                        <div className="flex flex-row mb-[0.8vw] justify-between">
                            <span className="text-[0.8vw] opacity-80">БАЗОВЫЙ</span>
                            <span className="text-[0.8vw] opacity-60">ТЕКУЩИЙ ПЛАН</span>
                        </div>

                        <div className="text-[1.6vw] font-medium mb-[1.2vw]">
                            0 ₽ / МЕС
                        </div>

                        <ul className="text-[0.85vw] leading-[1.5] space-y-[0.4vw] mb-[2vw] opacity-90">
                            <li>— ЗАГРУЗКА ФАЙЛОВ (С ЛИМИТОМ)</li>
                            <li>— РЕДАКТИРОВАНИЕ ДОКУМЕНТОВ</li>
                            <li>— АНАЛИТИКА И ПОДСВЕТКА РИСКОВ</li>
                        </ul>
                    </div>

                    <div className="pointer-events-none absolute left-[15vw] bottom-1/6 w-[15vw] h-[15vw] opacity-90">
                        <Image src="/landingImages/1.png" alt="" fill className="object-contain" />
                    </div>

                    <button className="w-full flex flex-row items-center justify-center rounded-full px-[4vw] py-[0.8vw] text-[0.85vw] bg-white/10 hover:bg-white/20 transition mt-auto z-10">
                        ОТКАЗАТЬСЯ ОТ ПОДПИСКИ
                    </button>
                </div>

                <div className="relative flex flex-col h-full p-[1vw] bg-transparent backdrop-blur-xs">
                    <div className="flex-1 z-10">
                        <div className="flex flex-row mb-[0.8vw]">
                            <span className="text-[0.8vw] text-black/60">ПРОДВИНУТЫЙ</span>
                        </div>

                        <div className="text-[1.6vw] font-medium mb-[1.2vw]">
                            5 000 ₽ / МЕС
                        </div>

                        <ul className="text-[0.85vw] leading-[1.5] space-y-[0.4vw] mb-[2vw] text-black/80">
                            <li>— ВЕСЬ БАЗОВЫЙ ФУНКЦИОНАЛ</li>
                            <li>— УВЕЛИЧЕНИЕ ЛИМИТОВ</li>
                            <li>— ГЕНЕРАЦИЯ ДОКУМЕНТОВ</li>
                        </ul>
                    </div>

                    <div className="pointer-events-none absolute left-[13vw] bottom-1/6 w-[15vw] h-[15vw] opacity-90">
                        <Image src="/landingImages/13.png" alt="" fill className="object-contain" />
                    </div>

                    <button className="w-full flex flex-row items-center justify-center rounded-full px-[4vw] py-[0.8vw] text-[0.85vw] border border-black/20 hover:bg-black/5 transition mt-auto z-10">
                        ПЕРЕЙТИ
                    </button>
                </div>

                <div className="relative flex flex-col h-full p-[1vw] bg-transparent backdrop-blur-xs">
                    <div className="flex-1 z-10">
                        <div className="flex flex-row mb-[0.8vw]">
                            <span className="text-[0.8vw] text-black/60">УЛЬТРА</span>
                        </div>

                        <div className="text-[1.6vw] font-medium mb-[1.2vw]">
                            15 000 ₽ / МЕС
                        </div>

                        <ul className="text-[0.85vw] leading-[1.5] space-y-[0.4vw] mb-[2vw] text-black/80">
                            <li>— ВЕСЬ ПРОДВИНУТЫЙ ФУНКЦИОНАЛ</li>
                            <li>— ДОСТУП К РЕЖИМУ УЛЬТРА</li>
                        </ul>
                    </div>

                    <div className="pointer-events-none absolute left-[15vw] bottom-1/6 w-[15vw] h-[15vw] opacity-90">
                        <Image src="/landingImages/4.png" alt="" fill className="object-contain" />
                    </div>

                    <button className="w-full flex flex-row items-center justify-center rounded-full px-[4vw] py-[0.8vw] text-[0.85vw] border border-black/20 hover:bg-black/5 transition mt-auto z-10">
                        ПЕРЕЙТИ
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AboutPrices;