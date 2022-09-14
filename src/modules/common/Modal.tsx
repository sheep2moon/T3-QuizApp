import React from "react";

type ModalProps = {
    open: boolean;
    setIsOpen: (v: boolean) => void;
    children: React.ReactNode;
};

const Modal = ({ open, setIsOpen, children }: ModalProps) => {
    if (!open) return <></>;
    return (
        <div className="fixed inset-0 z-50 bg-slate-500/10 flex justify-center items-center w-full" onClick={() => setIsOpen(false)}>
            <div onClick={e => e.stopPropagation()} className="flex bg-primary p-4 rounded-md shadow-md shadow-black w-full xsmall:w-fit h-full xsmall:h-fit">
                {children}
            </div>
        </div>
    );
};

export default Modal;
