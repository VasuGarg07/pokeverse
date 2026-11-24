type SliderElement = HTMLElement & { value: string };

interface SliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (value: number) => void;
}

export function Slider({ label, value, min, max, step = 1, onChange }: SliderProps) {
    return (
        <div>
            <p className="text-sm font-bold text-shadow">{label}</p>
            <sakuga-slider
                value={value}
                label={label}
                min={min}
                max={max}
                step={step}
                unit=""
                onInput={(event) => onChange(Number((event.currentTarget as SliderElement).value))}
            />
        </div>
    );
}
