import { ReactNode, memo } from "react";

interface FormButtonProps {
    children: ReactNode;
    disabled?: boolean;
    type?: 'submit' | 'button' | 'reset';
}

const FormButton = memo(({ children, disabled = false, type = 'submit' }: FormButtonProps) => {
    return (
        <button 
            type={type}
            disabled={disabled}
            className={`flex flex-row w-full justify-center bg-black p-[1vw] text-white text-[0.7vw] rounded-[100px] transition-opacity duration-300 ${
                disabled 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:opacity-80 hover:cursor-pointer'
            }`}
            style={{
                boxShadow: `
                    1.23px 1.47px 3.26px 0px rgba(0, 0, 0, 0.0169),
                    5.4px 6.48px 6.74px 0px rgba(0, 0, 0, 0.0275),
                    13.25px 15.9px 13.45px 0px rgba(0, 0, 0, 0.035),
                    25.51px 30.61px 26.36px 0px rgba(0, 0, 0, 0.0425),
                    -1px -9px 48.47px 0px rgba(0, 0, 0, 0.0531),
                    66.23px 79.48px 82.77px 0px rgba(0, 0, 0, 0.07)
                `,
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
            }}
        >
            {children}
        </button>
    )
});

FormButton.displayName = 'FormButton';

export default FormButton;