import React from 'react';

interface VerifyCardProps {
    status?: 'pending' | 'success' | 'error';
    message?: string;
}

const VerifyCard = ({ status = 'pending', message }: VerifyCardProps) => {
    const getTitle = () => {
        switch (status) {
            case 'success':
                return 'РЕГИСТРАЦИЯ ПОДТВЕРЖДЕНА';
            case 'error':
                return 'ОШИБКА ПОДТВЕРЖДЕНИЯ';
            default:
                return 'ПОДТВЕРДИТЕ РЕГИСТРАЦИЮ';
        }
    };

    const getContent = (): React.ReactNode => {
        if (message) {
            return message;
        }

        switch (status) {
            case 'success':
                return (
                    <>
                        Ваш email успешно подтвержден.<br/>
                        Сейчас вы будете перенаправлены...
                    </>
                );
            case 'error':
                return (
                    <>
                        Произошла ошибка при подтверждении email.<br/>
                        Попробуйте позже.
                    </>
                );
            default:
                return (
                    <>
                        НА ВАШУ ПОЧТУ БЫЛО ОТПРАВЛЕНО ПИСЬМО С ССЫЛКОЙ<br/>
                        НА ПОДТВЕРЖДЕНИЕ РЕГИСТРАЦИИ АККАУНТА. ПЕРЕЙДИТЕ<br/>
                        ПО ЭТОЙ ССЫЛКЕ ЧТОБЫ ПРОДОЛЖИТЬ.
                    </>
                );
        }
    };

    const getTextColor = () => {
        return 'text-black';
    };

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='flex flex-col border-2 rounded-[35px] p-[2.6vw] gap-[2.6vw]' style={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                borderColor: 'rgba(255, 255, 255, 0.5)',
                boxShadow: '66.23px 79.48px 82.77px 0px rgba(0, 0, 0, 0.07)',
            }}>
                <h1 className={`flex flex-row text-[1.6vw] ${getTextColor()}`}>
                    {getTitle()}
                </h1>
                <div className='text-[0.8vw] uppercase'>
                    {getContent()}
                </div>
            </div>
        </div>
    )
}

export default VerifyCard;