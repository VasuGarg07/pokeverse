import { TYPE_COLORS } from '../../helpers/constants';
import { hexToRgb } from '../../helpers/utilities';

function inkOn(color: string) {
    const { r, g, b } = hexToRgb(color);
    return 0.299 * r + 0.587 * g + 0.114 * b > 115 ? '#17151F' : '#FFFFFF';
}

export function TypeChip({ type }: { type: string }) {
    const color = TYPE_COLORS[type];
    return (
        <span className="border-2 border-shadow px-1.5 text-xs font-bold capitalize" style={{ background: color, color: inkOn(color) }}>
            {type}
        </span>
    );
}
