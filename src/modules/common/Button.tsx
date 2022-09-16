import React from "react";
import { clsx } from "clsx";

export type ButtonProps = {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
    variant?: "primary" | "secondary";
    disabled?: boolean;
};

const Button = ({ onClick, variant = "primary", disabled, children }: ButtonProps) => {
    return (
        <button
            disabled={disabled}
            className={clsx("p-2 w-full rounded-md", { "bg-secondary text-primary font-semibold": variant === "primary" }, { "bg-none border border-secondary text-secondary": variant === "secondary" })}
            onClick={onClick}
        >
            {disabled ? "Loading..." : children}
        </button>
    );
};

export default Button;
