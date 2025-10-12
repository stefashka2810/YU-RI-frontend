import './globals.css';
import { Metadata } from 'next';
import React from 'react';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
    title: 'YU-RI',
    description: 'YU-RI platform',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
            <body>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
