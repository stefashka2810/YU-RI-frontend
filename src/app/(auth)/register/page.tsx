'use client'
import AuthCard from "@/components/auth/authCard/AuthCard";
import { useState, FormEvent } from "react";
import FormButton from "@/components/ui/formButton/FormButton";
import { useAuth } from "@/context/AuthContext";

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [validationError, setValidationError] = useState('');
    const { register, isLoading, error } = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValidationError('');

        // Кастомная валидация
        if (!username) {
            setValidationError('Введите имя');
            return;
        }

        if (!email) {
            setValidationError('Введите email');
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            setValidationError('Введите корректный email');
            return;
        }

        if (!password) {
            setValidationError('Введите пароль');
            return;
        }

        if (password.length < 6) {
            setValidationError('Пароль должен содержать минимум 6 символов');
            return;
        }

        if (!passwordConfirm) {
            setValidationError('Повторите пароль');
            return;
        }

        if (password !== passwordConfirm) {
            setValidationError('Пароли не совпадают');
            return;
        }

        await register({ username, email, password, passwordConfirm });
        // Редирект происходит автоматически в AuthContext
    };

    const displayError = validationError || error;

    return (
        <>
            <AuthCard>
                <form onSubmit={handleSubmit} noValidate className='flex flex-col gap-[2.6vw]'>
                    {displayError && (
                        <div className='text-black text-[0.9vw] text-center'>
                            {displayError}
                        </div>
                    )}

                    <input
                        type='text'
                        placeholder="ИМЯ"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={isLoading}
                        className='outline-none bg-transparent border-b-1 border-black pb-[0.7vw] text-[1vw] placeholder:text-black/50 transition-all duration-300 focus:border-black/70 disabled:opacity-50'
                    />
                    <input
                        type='text'
                        placeholder="EMAIL"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        className='outline-none bg-transparent border-b-1 border-black pb-[0.7vw] text-[1vw] placeholder:text-black/50 transition-all duration-300 focus:border-black/70 disabled:opacity-50'
                    />
                    <input
                        type='password'
                        placeholder="ПАРОЛЬ"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        className='outline-none bg-transparent border-b-1 border-black pb-[0.7vw] text-[1vw] placeholder:text-black/50 transition-all duration-300 focus:border-black/70 disabled:opacity-50'
                    />
                    <input
                        type='password'
                        placeholder="ПОВТОРИТЕ ПАРОЛЬ"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        disabled={isLoading}
                        className='outline-none bg-transparent border-b-1 border-black pb-[0.7vw] text-[1vw] placeholder:text-black/50 transition-all duration-300 focus:border-black/70 disabled:opacity-50'
                    />
                    <FormButton disabled={isLoading}>
                        {isLoading ? 'ЗАГРУЗКА...' : 'ЗАРЕГИСТРИРОВАТЬСЯ'}
                    </FormButton>
                </form>
            </AuthCard>
        </>
    )
}
export default RegisterPage;