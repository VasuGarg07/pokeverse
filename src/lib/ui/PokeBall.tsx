export function PokeBall({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} stroke="#17151F" strokeWidth="4" aria-hidden="true">
            <circle cx="32" cy="32" r="29.5" fill="#FFFFFF" />
            <path d="M2.5 32a29.5 29.5 0 0 1 59 0Z" fill="#D00000" />
            <circle cx="32" cy="32" r="9.5" fill="#FFFFFF" />
        </svg>
    );
}
