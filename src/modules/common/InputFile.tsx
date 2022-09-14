import Image from "next/image";
import React from "react";

type InputFileProps = {
    setFile: (f: any) => void;
    file: any;
};

const InputFile = ({ file, setFile }: InputFileProps) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFile(e.currentTarget.files?.[0]);
    };

    return (
        <div className="w-full aspect-square relative bg-light/5 rounded-sm mb-2">
            <input className="absolute inset-0 opacity-0 z-50" type="file" onChange={handleFileChange} />
            {file ? (
                <div className="border w-full aspect-square relative">
                    <Image src={URL.createObjectURL(file)} alt="podgląd" layout="fill" />
                </div>
            ) : (
                <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">Dodaj zdjęcie</span>
            )}
        </div>
    );
};

export default InputFile;
