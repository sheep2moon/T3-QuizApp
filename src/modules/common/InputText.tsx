import React from "react";

type InputProps = {
    label?: string;
    value: string;
    name?: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputText = ({ label, name, value, placeholder, onChange }: InputProps) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            {label && <label>{label}</label>}
            <input className="bg-primary p-2 border border-light rounded-md" value={value} name={name} onChange={onChange} placeholder={placeholder} />
        </div>
    );
};

export default InputText;
