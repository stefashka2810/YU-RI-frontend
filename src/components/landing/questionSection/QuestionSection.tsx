"use client"
import { useState } from "react";
import Image from "next/image";

const faqs = [
    {
        q: "У КОГО ЕСТЬ ДОСТУП К ИИ-АГЕНТАМ?",
        a: "ИИ-АГЕНТЫ РАЗРАБАТЫВАЮТСЯ ПО ДОГОВОРЕННОСТИ С КОМПАНИЯМИ, ДЛЯ ВСЕХ ОСТАЛЬНЫХ ДЕЙСТВУЕТ SAAS МОДЕЛЬ С НАШИМ БАЗОВЫМ ФУНКЦИОНАЛОМ: АНАЛИЗ, ГЕНЕРАЦИЯ, РЕДАКТИРОВАНИЕ."
    },
    {
        q: "У КОГО ЕСТЬ ДОСТУП К ИИ-АГЕНТАМ?",
        a: "ИИ-АГЕНТЫ РАЗРАБАТЫВАЮТСЯ ПО ДОГОВОРЕННОСТИ С КОМПАНИЯМИ, ДЛЯ ВСЕХ ОСТАЛЬНЫХ ДЕЙСТВУЕТ SAAS МОДЕЛЬ С НАШИМ БАЗОВЫМ ФУНКЦИОНАЛОМ: АНАЛИЗ, ГЕНЕРАЦИЯ, РЕДАКТИРОВАНИЕ."
    },
    {
        q: "КАК МЫ ОБЕСПЕЧИВАЕМ БЕЗОПАСНОСТЬ ДАННЫХ?",
        a: "ДОКУМЕНТЫ ОТПРАВЛЯЮТСЯ В СИСТЕМУ ТОЛЬКО ДЛЯ АНАЛИЗА: ПОСЛЕ ФОРМИРОВАНИЯ РЕЗУЛЬТАТА ИСХОДНЫЕ ДАННЫЕ НЕ СОХРАНЯЮТСЯ. ВСЕ СОЕДИНЕНИЯ ЗАЩИЩЕНЫ: ПЕРЕДАЧА ПРОИСХОДИТ ПО ЗАЩИЩЁННЫМ СЕССИЯМ."
    }
];

const QuestionSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0); // по умолчанию открыт первый

    return (
        <section className="grid grid-cols-[33vw_auto] mt-[5vw]">
            <Image src='/landingImages/6.png' alt='ball' width={600} height={600} />
            <section className="pt-[20vw] w-[55vw]">
                {/* Заголовок */}
                <h2 className="text-[2.2vw] font-medium mb-[1.7vw]">FAQ</h2>

                {/* Список */}
                <div className="divide-y divide-black/70">
                    {faqs.map((item, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div key={i} className="border-b border-black/70 pt-[1.4vw]">
                                {/* Заголовок вопроса */}
                                <button
                                    type="button"
                                    aria-expanded={isOpen}
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    className="w-full flex items-center justify-between   cursor-pointer select-none"
                                >
                <span className="text-[1.8vw] leading-none tracking-wide uppercase text-left">
                  {item.q}
                </span>

                                    {/* Иконка: плюс / крестик */}
                                    <span className="relative w-[2.6vw] h-[2.6vw] flex items-center justify-center">
                  {/* Плюс */}
                                        <svg
                                            viewBox="0 0 24 24"
                                            className={`w-full h-full stroke-black transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
                                            fill="none" strokeWidth="1.5" strokeLinecap="round"
                                        >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                                        {/* Крестик */}
                                        <svg
                                            viewBox="0 0 24 24"
                                            className={`w-full h-full stroke-black absolute transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
                                            fill="none" strokeWidth="1.5" strokeLinecap="round"
                                        >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </span>
                                </button>

                                {/* Контент с плавным разворачиванием */}
                                <div
                                    className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                                >
                                    <div className="overflow-hidden pt-[1.4vw] pb-[1.4vw]">
                                        <p className="text-[0.95vw] leading-[1.5] text-black/80">
                                            {item.a}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </section>

    );
};

export default QuestionSection;
