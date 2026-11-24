import { fx, type SpringLike } from './sakuga';

interface Tooltip extends HTMLElement {
    isOpen: boolean;
    tip: HTMLElement;
    s: SpringLike;
    render(): string;
}

interface TooltipClass {
    new (): Tooltip;
    css: string;
}

const SakugaTooltip = customElements.get('sakuga-tooltip') as unknown as TooltipClass;

class LinkTooltip extends SakugaTooltip {
    static css = `${SakugaTooltip.css}
        :host { margin: 0; }
        .tip { min-width: 0; padding: 7px 13px; border-radius: 0; font: 400 15px/1.2 var(--font-display); }
        .help { width: 44px; height: 44px; box-shadow: none; }
        .help:hover { background: var(--sk-acc); color: #fff; }`;

    render() {
        return super.render()
            .replace('<button class="help" type="button"', `<a class="help" target="_blank" rel="noopener noreferrer" href="${this.getAttribute('href')}"`)
            .replace('</button>', '</a>');
    }

    show(on = true) {
        if (on === this.isOpen) return;
        this.isOpen = on;
        this.s.to = on ? 1 : 0;
        this.s.d = on ? 15 : 34;
        if (!on) return;
        fx.later(120, () => {
            if (!this.isOpen) return;
            const { x, y, w } = fx.at(this.tip);
            for (const side of [-1, 1]) fx.puff(x + side * (w / 2 + 6), y + 8, { size: 6, n: 3, vx: side * 12, vy: -6, life: 0.5 });
        });
    }
}

fx.define('pv-link-tip', LinkTooltip);
