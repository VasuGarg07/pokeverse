import type { ButtonHTMLAttributes } from 'react';

const TONES = {
    ink: 'bg-shadow text-white hover:bg-crimson',
    crimson: 'bg-crimson text-white hover:bg-shadow',
    cobalt: 'bg-cobalt text-white hover:bg-shadow',
    paper: 'bg-white text-shadow hover:bg-shadow hover:text-white',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    tone?: keyof typeof TONES;
    press?: 'browse' | 'choose' | 'hit';
}

export function Button({ tone = 'ink', press = 'browse', className = '', ...rest }: ButtonProps) {
    return (
        <button
            type="button"
            data-press={press}
            className={`min-h-11 px-5 border-3 border-shadow font-display text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${TONES[tone]} ${className}`}
            {...rest}
        />
    );
}
