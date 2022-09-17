import React, { useState } from "react";
import Button from "../modules/common/Button";
import Container from "../modules/common/Container";
import InputFile from "../modules/common/InputFile";
import InputText from "../modules/common/InputText";
import { uploadFile } from "../server/common/uploadFile";
import { trpc } from "../utils/trpc";

const CreateCategory = () => {
    const [file, setFile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { mutateAsync: createCategory } = trpc.useMutation(["protected.createCategory"]);
    const { mutateAsync: createPresignedUrl } = trpc.useMutation(["images.createPresignedUrl"]);

    const [categoryName, setCategoryName] = useState("");

    const handleCreateCategory = async () => {
        setIsLoading(true);
        let imageId = "";
        if (file) {
            const imgData = (await createPresignedUrl()) as any;
            imageId = imgData.imageId;
            await uploadFile({ file, url: imgData.url, fields: imgData.fields });
        } else {
            imageId = "default";
        }

        await createCategory({ name: categoryName, imageId });
        setIsLoading(false);
        setFile(null);
        setCategoryName("");
    };

    const handleCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(e.target.value);
    };

    return (
        <Container>
            <div className="flex flex-col gap-4 h-full mt-2 max-w-lg mx-auto">
                <InputFile file={file} setFile={setFile} />
                <InputText name="name" label="Nazwa kategorii" value={categoryName} onChange={handleCategoryNameChange} />
                <p className="mt-auto bg-light/5 p-4 rounded-lg">
                    <div className="font-bold">Uwaga!</div>
                    Zanim nowa kategoria zostanie dodana, zostanie ona zweryfikowana przez jednego z moderatorów.
                </p>
                <Button disabled={isLoading} variant="primary" onClick={handleCreateCategory}>
                    {isLoading ? "Czekaj..." : "Stwórz"}
                </Button>
            </div>
        </Container>
    );
};

export default CreateCategory;
