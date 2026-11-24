import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    showClose: boolean
};

export function GlobalModal({ isOpen, onClose, children, showClose = true }: Props) {
    const dialog = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const el = dialog.current!;
        if (isOpen && !el.open) el.showModal();
        if (!isOpen) el.close();
    }, [isOpen]);

    return (
        <dialog
            ref={dialog}
            className="m-auto w-[calc(100%-2rem)] max-w-lg max-h-[90vh] border-3 border-shadow bg-white p-0 backdrop:bg-shadow/70"
            onCancel={(event) => {
                event.preventDefault();
                if (showClose) onClose();
            }}
            onClick={(event) => {
                if (showClose && event.target === event.currentTarget) onClose();
            }}
        >
            <div className="relative p-5 pt-14 md:p-7 md:pt-14">
                {showClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-0 right-0 w-11 h-11 grid place-items-center bg-shadow text-white hover:bg-crimson cursor-pointer"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
                {children}
            </div>
        </dialog>
    );
}
