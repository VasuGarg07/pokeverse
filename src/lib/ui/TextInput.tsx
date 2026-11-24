import { useId, type InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    labelClassName?: string;
}

export function TextInput({ label, error, labelClassName = 'block text-sm font-bold text-shadow', ...rest }: TextInputProps) {
    const id = useId();

    return (
        <div className="space-y-1.5">
            <label htmlFor={id} className={labelClassName}>{label}</label>
            <input
                id={id}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${id}-error` : undefined}
                className="w-full min-h-11 px-3 border-3 border-shadow bg-white text-shadow placeholder:text-smoke"
                {...rest}
            />
            {error && <p id={`${id}-error`} className="relative inline-block bg-white border-3 border-shadow px-2 text-sm font-bold text-crimson">{error}</p>}
        </div>
    );
}
