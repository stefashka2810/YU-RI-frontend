import Image from "next/image";

const AdditionalInfo = () => {
    return (
        <section className="relative w-full flex justify-end items-center ">
            <div className="relative w-[80vw] flex justify-end items-center">
                <div className="relative w-[52vw] h-[52vw]">
                    <Image
                        src="/landingImages/5.png"
                        alt="abstract shape"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>


                <div className="absolute top-1/2 -translate-y-1/3 translate-x-[-20vw] z-10 w-[50vw]">
                    <div className='flex flex-col border-2 rounded-[35px] p-[2.6vw] gap-[2.6vw]' style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        boxShadow: '66.23px 79.48px 82.77px 0px rgba(0, 0, 0, 0.07)',
                    }}>
                        ИИ-АГЕНТ ПРЕДОСТАВЛЯЕТСЯ КАК ИНДИВИДУАЛЬНАЯ УСЛУГА ПО ДОГОВОРЁННОСТИ: МЫ НАСТРАИВАЕМ И ОБУЧАЕМ ЕГО ПОД ВАШИ ВНУТРЕННИЕ ПРОЦЕССЫ, ПРАВИЛА И СЦЕНАРИИ, ИНТЕГРИРУЕМ С КОРПОРАТИВНЫМИ СИСТЕМАМИ И СОГЛАСУЕМ ПАРАМЕТРЫ РАЗМЕЩЕНИЯ, БЕЗОПАСНОСТИ И ДОСТУПА. УСЛОВИЯ ВНЕДРЕНИЯ, СРОКИ ПИЛОТА, УРОВЕНЬ ПОДДЕРЖКИ И СТОИМОСТЬ ОБСУЖДАЮТСЯ ОТДЕЛЬНО — ПОСЛЕ ОЦЕНКИ ЗАДАЧ МЫ ПРЕДЛАГАЕМ ПИЛОТНЫЙ ПРОЕКТ С ЧЁТКИМИ SLA И ДАЛЬНЕЙШИМИ ШАГАМИ ПО МАСШТАБИРОВАНИЮ.

                    </div>

                    <div className="absolute inset-0 flex items-start justify-start p-[5vw]">
                        <p className="text-[1vw] leading-[1.4] font-normal text-start">
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdditionalInfo;
