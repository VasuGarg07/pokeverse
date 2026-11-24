import { useEffect, useRef, useState } from 'react';
import { fx } from '../lib/sakuga';

export function usePanelScene(sceneMs: number, choreograph: (panel: HTMLElement) => void) {
    const panel = useRef<HTMLAnchorElement>(null);
    const busy = useRef(false);
    const [playing, setPlaying] = useState(false);

    const play = () => {
        if (busy.current || fx.calm) return;
        busy.current = true;
        choreograph(panel.current!);
        setPlaying(true);
        setTimeout(() => {
            busy.current = false;
            setPlaying(false);
        }, sceneMs);
    };

    useEffect(() => {
        if (!matchMedia('(hover: none)').matches) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            play();
        }, { threshold: 0.8 });
        observer.observe(panel.current!);
        return () => observer.disconnect();
    }, []);

    return { panel, playing, play };
}
