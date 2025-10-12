'use client'
import VerifyCard from "@/components/auth/verifyCard/VerifyCard";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import authService from "@/services/auth.service";
import { handleApiError } from "@/utils/error.utils";

const VerifyEmailPage = () => {
    const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
    const [message, setMessage] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const verifyToken = searchParams.get('token');
        
        // Если есть токен в URL, верифицируем автоматически
        if (verifyToken) {
            handleVerification(verifyToken);
        }
    }, [searchParams]);

    const handleVerification = async (token: string) => {
        try {
            const response = await authService.verifyEmail(token);
            setStatus('success');
            setMessage(response.message || 'Email успешно подтвержден!');
            
            // Редирект на страницу чата через 2 секунды
            setTimeout(() => {
                router.push('/chat');
            }, 2000);
        } catch (err) {
            setStatus('error');
            setMessage(handleApiError(err));
        }
    };

    return (
        <>
            <VerifyCard status={status} message={message} />
        </>
    )
}

export default VerifyEmailPage;