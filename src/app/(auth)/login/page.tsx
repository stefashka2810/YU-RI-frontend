'use client'
import AuthCard from "@/components/auth/authCard/AuthCard";
import { useState, FormEvent } from "react";
import FormButton from "@/components/ui/formButton/FormButton";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationError] = useState('');
    const { login, isLoading, error } = useAuth();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValidationError('');

        // Кастомная валидация
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
        
        await login({ email, password });
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
                    <FormButton disabled={isLoading}>
                        {isLoading ? 'ЗАГРУЗКА...' : 'ВОЙТИ'}
                    </FormButton>
                </form>
            </AuthCard>
        </>
    )
}
export default LoginPage;