import { useId, type InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    labelClassName?: string;
}

export function TextInput({ label, error, labelClassName = 'text-shadow', ...rest }: TextInputProps) {
    const id = useId();

    return (
        <div className="space-y-1.5">
            <label htmlFor={id} className={`block text-sm font-bold ${labelClassName}`}>{label}</label>
            <input
                id={id}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${id}-error` : undefined}
                className={`w-full min-h-11 px-3 border-3 bg-white text-shadow placeholder:text-smoke ${error ? 'border-crimson' : 'border-shadow'}`}
                {...rest}
            />
            {error && <p id={`${id}-error`} className="text-sm font-bold text-crimson">{error}</p>}
        </div>
    );
}
