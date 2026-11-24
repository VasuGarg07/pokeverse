import { useEffect, useRef } from 'react';

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
    const slider = useRef<SliderElement>(null);

    useEffect(() => {
        if (slider.current!.value !== String(value)) slider.current!.value = String(value);
    }, [value]);

    return (
        <div>
            <p className="text-sm font-bold text-shadow">{label}</p>
            <sakuga-slider
                ref={slider}
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
