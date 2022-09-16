import { Question, Quiz } from "@prisma/client";
import React, { useState } from "react";
import { BsArrow90DegDown } from "react-icons/bs";
import { uploadFile } from "../../server/common/uploadFile";
import { trpc } from "../../utils/trpc";
import Button from "../common/Button";
import Checkbox from "../common/Checkbox";
import InputFile from "../common/InputFile";
import InputText from "../common/InputText";
import LoadingSpinner from "../common/LoadingSpinner";
import EditQuestionsList from "./components/EditQuestionsList";

type EditQuestionsProps = {
    quizId: string;
};

const questionInitData = {
    title: "",
    answerA: "",
    answerB: "",
    answerC: "",
    answerD: "",
    correctAnswer: ""
};

const EditQuizQuestions = ({ quizId }: EditQuestionsProps) => {
    const [currentQuestionData, setCurrentQuestionData] = useState(questionInitData);
    const [file, setFile] = useState<any>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { mutateAsync: addQuestion } = trpc.useMutation(["protected.addQuestion"]);
    const { mutateAsync: createPresignedUrl } = trpc.useMutation(["images.createPresignedUrl"]);
    const quizData = trpc.useQuery(["quizzes.getQuizById", { id: quizId }]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentQuestionData(prev => ({ ...prev, [name]: value }));
    };

    const setCorrectAnswer = (option: string) => {
        setCurrentQuestionData(prev => ({ ...prev, correctAnswer: option }));
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        // Storing Image
        if (!file) {
            setIsLoading(false);
            return console.log("no fille TODO");
        }
        const { url, fields, imageId } = (await createPresignedUrl()) as any;
        await uploadFile({ file, url, fields });

        if (isEdit) {
            // HandleEdit
        } else {
            // HandleAdd
            await addQuestion({ ...currentQuestionData, imageId, quizId });
            setCurrentQuestionData(questionInitData);
            setFile(null);
            quizData.refetch();
            setIsLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit} className="p-1 mb-4 flex flex-col gap-1 w-full">
                <div className="mx-auto w-full max-w-xs">
                    <InputFile file={file} setFile={setFile} />
                </div>
                <InputText name="title" placeholder="Treść pytania" value={currentQuestionData.title} onChange={handleInputChange} />
                <span className="flex">
                    <div className="w-8 flex justify-center items-end mr-2">
                        <BsArrow90DegDown />
                    </div>
                    Wybierz prawidłową odpowiedź
                </span>
                {["A", "B", "C", "D"].map(option => {
                    type ObjectKey = keyof typeof currentQuestionData;
                    const key = `answer${option}` as ObjectKey;
                    return (
                        <div className="flex items-center gap-2 w-full" key={key}>
                            <Checkbox handleClick={() => setCorrectAnswer(option)} checked={currentQuestionData.correctAnswer === option} />
                            <InputText name={`answer${option}`} placeholder={`Odpowiedź ${option}`} value={currentQuestionData[key]} onChange={handleInputChange} />
                        </div>
                    );
                })}
                <Button disabled={isLoading} type="submit">
                    {isLoading ? <LoadingSpinner size="small" /> : "Dodaj pytanie"}
                </Button>
            </form>
            {quizData.isLoading && <LoadingSpinner />}
            {quizData.isSuccess && quizData.data && <EditQuestionsList questions={quizData.data.questions} refetch={quizData.refetch} />}
        </div>
    );
};

export default EditQuizQuestions;
