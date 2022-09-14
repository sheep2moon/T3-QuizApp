import clsx from "clsx";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { getCategoryImageUrl } from "../../utils/getImageUrl";
import { trpc } from "../../utils/trpc";
import Button from "../common/Button";
import InputFile from "../common/InputFile";
import InputText from "../common/InputText";
import TextArea from "../common/TextArea";
import NewQuestion from "./components/NewQuestion";
import StepContainer from "./components/StepContainer";

const NewQuizForm = () => {
    const [step, setStep] = useState(1);
    const [quizData, setQuizData] = useState({ title: "", image: "", categoryId: "", description: "" });
    const [searchQuery, setSearchQuery] = useState("");
    const [file, setFile] = useState<any>(null);
    const categories = trpc.useQuery(["quizzes.getCategories"]);

    const filteredCategories = useMemo(() => {
        if (categories.data) {
            return categories.data.filter(category => category.name.toLowerCase().includes(searchQuery.toLowerCase()));
        } else return [];
    }, [categories, searchQuery]);

    const prevStep = () => setStep(prev => Math.max(0, prev - 1));
    const nextStep = () => setStep(prev => Math.min(2, prev + 1));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setQuizData(prev => ({ ...prev, [name]: value }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const selectCategory = (categoryId: string) => {
        setQuizData(prev => ({ ...prev, categoryId }));
    };

    switch (step) {
        case 1:
            return (
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-center font-bold bg-secondary rounded-md text-primary py-2 mb-4">Wybierz kategorie</span>
                    <InputText placeholder="Szukaj..." value={searchQuery} onChange={handleSearchChange} />
                    <div className="flex flex-col gap-1 h-64 border p-1 border-light/10 rounded-md w-full">
                        {categories.isSuccess &&
                            filteredCategories.map(category => (
                                <div
                                    key={category.id}
                                    onClick={() => selectCategory(category.id)}
                                    className={clsx("flex flex-col text-primary border-light rounded-sm", { "bg-secondary": quizData.categoryId === category.id, "bg-light": quizData.categoryId !== category.id })}
                                >
                                    <span className="p-1 mr-4">{category.name}</span>
                                    {/* <Image src={getCategoryImageUrl(category.imageId) ?? ""} width="200px" height="200px" alt="category" /> */}
                                </div>
                            ))}
                    </div>
                    <Button variant="secondary" onClick={nextStep}>
                        Dalej
                    </Button>
                </div>
            );
        case 2:
            return (
                <div className="w-full flex flex-col  gap-2">
                    <span className="text-center font-bold bg-secondary rounded-md text-primary py-2 mb-4">Podstawowe informacje</span>
                    <div className="flex w-full max-w-sm mx-auto">
                        <InputFile file={file} setFile={setFile} />
                    </div>
                    <InputText label="Nazwa quizu" name="title" placeholder="Dla fanów ŚWK" value={quizData.title} onChange={handleInputChange} />
                    <TextArea label="Opis quizu" value={quizData.description} setValue={(v: string) => setQuizData(prev => ({ ...prev, description: v }))} placeholder="Opis..." />
                    <div className="flex">
                        <Button variant="secondary" onClick={prevStep}>
                            Wstecz
                        </Button>
                        <Button variant="primary" onClick={nextStep}>
                            Dalej
                        </Button>
                    </div>
                </div>
            );

        default:
            return <div>what</div>;
    }
};

export default NewQuizForm;
