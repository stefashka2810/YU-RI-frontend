import {ReactNode} from "react";

const Button = ({children, onClick}: {children: ReactNode, onClick?: () => void}) => {
    return (
        <button
            onClick={onClick}
            className='inline-block text-[1vw] rounded-[100px] w-[30vw] h-[5.5vw] font-medium hover:cursor-pointer relative transition-all duration-300 ease-in-out hover:bg-white/90 hover:scale-105 will-change-transform'
            style={{
                background: 'rgba(255, 255, 255, 0.8)',
                border: '2px solid rgba(255, 255, 255, 0.8)',
                boxShadow: `
                    1.23px 1.47px 3.26px 0px #00000004,
                    5.4px 6.48px 6.74px 0px #00000007,
                    13.25px 15.9px 13.45px 0px #00000009,
                    25.51px 30.61px 26.36px 0px #0000000B,
                    -1px -9px 48.47px 0px #0000000E,
                    66.23px 79.48px 82.77px 0px #00000012
                `,
                padding: '10px 15px',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                backfaceVisibility: 'hidden',
                transformOrigin: 'center',
            }}
        >
            {children}
        </button>
    )
}

export default Button;