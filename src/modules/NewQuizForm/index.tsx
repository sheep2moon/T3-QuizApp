import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { uploadFile } from "../../server/common/uploadFile";
import { trpc } from "../../utils/trpc";
import Button from "../common/Button";
import InputFile from "../common/InputFile";
import InputText from "../common/InputText";
import LoadingSpinner from "../common/LoadingSpinner";
import TextArea from "../common/TextArea";

const NewQuizForm = () => {
    const [step, setStep] = useState(1);
    const [quizData, setQuizData] = useState({ title: "", imageId: "", categoryId: "", description: "" });
    const [searchQuery, setSearchQuery] = useState("");
    const [file, setFile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const categories = trpc.useQuery(["quizzes.getCategories"]);
    const { mutateAsync: createQuiz } = trpc.useMutation(["protected.createQuiz"]);
    const { mutateAsync: createPresignedUrl } = trpc.useMutation(["images.createPresignedUrl"]);

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

    const handleCreateQuiz = async () => {
        setIsLoading(true);

        let imageId = "";
        if (file) {
            const imgData = (await createPresignedUrl()) as any;
            imageId = imgData.imageId;
            await uploadFile({ url: imgData.url, fields: imgData.fields, file });
        } else {
            imageId = "default";
        }

        const { title, categoryId, description } = quizData;
        const quiz = await createQuiz({ title, categoryId, description, imageId });
        setIsLoading(false);
        setQuizData({ title: "", imageId: "", categoryId: "", description: "" });
        setFile(null);
        router.push(`/edit-quiz/${quiz.id}`);
        console.log(quiz);
    };

    switch (step) {
        case 1:
            return (
                <div className="flex flex-col gap-2 w-full h-full">
                    <span className="text-center font-bold bg-secondary rounded-md text-primary py-2 my-1">Wybierz kategorie</span>
                    <InputText placeholder="Szukaj..." value={searchQuery} onChange={handleSearchChange} />
                    <div className="h-80 overflow-y-scroll scroll  border p-1 border-light/10 rounded-md w-full">
                        {categories.isLoading && (
                            <div className="h-full w-full flex items-center justify-center">
                                <LoadingSpinner />
                            </div>
                        )}
                        <div className="grid grid-cols-2 grid-rows-4 gap-1">
                            {categories.isSuccess &&
                                filteredCategories.map(category => (
                                    <div
                                        key={category.id}
                                        onClick={() => selectCategory(category.id)}
                                        className={clsx("flex justify-center items-center text-lg  text-light border-light rounded-md", {
                                            "bg-light/30": quizData.categoryId === category.id,
                                            "bg-light/10": quizData.categoryId !== category.id
                                        })}
                                    >
                                        <span className="p-6 break-words whitespace-pre-wrap text-center">{category.name}</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <Button variant="secondary" onClick={nextStep}>
                        Dalej
                    </Button>
                </div>
            );
        case 2:
            return (
                <div className=" flex flex-col gap-2 h-full w-full ">
                    <span className="text-center font-bold bg-secondary rounded-md text-primary py-2 my-1">Podstawowe informacje</span>
                    <div className="flex w-full max-w-[260px] mx-auto">
                        <InputFile file={file} setFile={setFile} />
                    </div>
                    <InputText label="Nazwa quizu" name="title" placeholder="Dla fanów ŚWK" value={quizData.title} onChange={handleInputChange} />
                    <TextArea label="Opis quizu" value={quizData.description} setValue={(v: string) => setQuizData(prev => ({ ...prev, description: v }))} placeholder="Opis..." />
                    <div className="flex mt-auto gap-1">
                        <Button variant="secondary" onClick={prevStep}>
                            Wstecz
                        </Button>
                        <Button disabled={isLoading} variant="primary" onClick={handleCreateQuiz}>
                            {isLoading ? <LoadingSpinner /> : "Stwórz"}
                        </Button>
                    </div>
                </div>
            );

        default:
            return <div>what</div>;
    }
};

export default NewQuizForm;
