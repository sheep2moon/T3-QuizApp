import React from "react";
import { clsx } from "clsx";

// export type ButtonProps = {
//     onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;

//     disabled?: boolean;
//     rest?: React.HTMLAttributes<HTMLButtonElement>;
// };

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    variant?: "primary" | "secondary";
}

const Button = ({ onClick, variant = "primary", disabled, type, children }: ButtonProps) => {
    return (
        <button
            disabled={disabled}
            className={clsx("p-2 w-full rounded-md", { "bg-secondary text-primary font-semibold": variant === "primary" }, { "bg-none border border-secondary text-secondary": variant === "secondary" })}
            onClick={onClick}
            type={type}
        >
            {disabled ? "Loading..." : children}
        </button>
    );
};

export default Button;
