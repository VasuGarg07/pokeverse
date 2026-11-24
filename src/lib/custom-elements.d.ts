import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type SakugaElement<Extra = object> = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & Extra;

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'sakuga-button': SakugaElement<{ variant?: 'secondary'; disabled?: boolean }>;
            'sakuga-input': SakugaElement<{ class?: string; type?: string; label?: string; placeholder?: string }>;
            'pv-link-tip': SakugaElement<{ href: string; text: string; label: string }>;
            'sakuga-slider': SakugaElement<{ label?: string; value?: number; min?: number; max?: number; step?: number; unit?: string }>;
        }
    }
}
