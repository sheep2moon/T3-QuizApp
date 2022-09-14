import Image from "next/image";
import React, { useState } from "react";
import Button from "../modules/common/Button";
import InputFile from "../modules/common/InputFile";
import InputText from "../modules/common/InputText";
import { trpc } from "../utils/trpc";

const CreateCategory = () => {
    const [file, setFile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { mutateAsync: createPresignedUrl } = trpc.useMutation(["images.createPresignedUrl"]);
    const { mutateAsync: createCategory } = trpc.useMutation(["protected.createCategory"]);

    const [categoryName, setCategoryName] = useState("");

    const handleFileUpload = async () => {
        setIsLoading(true);
        if (!file) return;
        const { url, fields } = (await createPresignedUrl()) as any;
        const data = {
            ...fields,
            "Content-Type": file.type,
            file
        };
        console.log(url, fields);
        const formData = new FormData();
        for (const name in data) {
            formData.append(name, data[name]);
        }
        await fetch(url, {
            method: "POST",
            body: formData
        });

        await createCategory({ name: categoryName, imageId: fields.key.split("/")[1] });
        setIsLoading(false);
        setFile(null);
        setCategoryName("");
    };

    const handleCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(e.target.value);
    };

    return (
        <div className="flex flex-col gap-4">
            <InputText name="name" label="Nazwa kategorii" value={categoryName} onChange={handleCategoryNameChange} />
            <InputFile file={file} setFile={setFile} />
            <Button disabled={isLoading} variant="primary" onClick={handleFileUpload}>
                {isLoading ? "Czekaj..." : "Stwórz"}
            </Button>
        </div>
    );
};

export default CreateCategory;
