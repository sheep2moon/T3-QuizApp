import clsx from "clsx";
import React from "react";

type InputProps = {
    label?: string;
    value: string;
    name?: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors?: string[];
    setErrors?: (arr: string[]) => void;
};

const InputText = ({ label, name, value, placeholder, setErrors, errors, onChange }: InputProps) => {
    const handleFocus = () => {
        if (setErrors && errors) {
            setErrors(errors.filter(e => e !== name));
        }
    };

    return (
        <div className="flex flex-col gap-1 w-full">
            {label && <label>{label}</label>}
            <input
                className={clsx("bg-primary p-2 border border-light rounded-md", { "border-rose-500": name && errors && errors.includes(name), "border-light": name && errors && !errors.includes(name) })}
                value={value}
                onFocus={handleFocus}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputText;
