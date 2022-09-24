import { Question, Quiz } from "@prisma/client";
import clsx from "clsx";
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

type FormErrors = string[];

const EditQuizQuestions = ({ quizId }: EditQuestionsProps) => {
    const [currentQuestionData, setCurrentQuestionData] = useState(questionInitData);
    const [file, setFile] = useState<any>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formErrors, setFormErrors] = useState<FormErrors>([]);

    const { mutateAsync: addQuestion } = trpc.useMutation(["protected.addQuestion"]);
    const { mutateAsync: createPresignedUrl } = trpc.useMutation(["images.createPresignedUrl"]);
    const quizData = trpc.useQuery(["quizzes.getQuizById", { id: quizId }]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentQuestionData(prev => ({ ...prev, [name]: value }));
    };

    const setCorrectAnswer = (option: string) => {
        setCurrentQuestionData(prev => ({ ...prev, correctAnswer: option }));
        if (formErrors.includes("correctAnswer")) setFormErrors(prev => prev.filter(e => e !== "correctAnswer"));
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formErr: string[] = [];
        Object.keys(currentQuestionData).forEach(key => {
            if ((currentQuestionData as any)[key] === "") formErr.push(key);
        });
        if (formErr.length > 0) {
            setFormErrors(formErr);
            setIsLoading(false);
            return;
        }

        let imageId = "";
        if (file) {
            const imgData = (await createPresignedUrl()) as any;
            imageId = imgData.idImage;

            await uploadFile({ file, url: imgData.url, fields: imgData.fields });
        } else imageId = "default";

        if (isEdit) {
            // HandleEdit
        } else {
            // HandleAdd
            await addQuestion({ ...currentQuestionData, imageId, quizId });
            setCurrentQuestionData(questionInitData);
            setFile(null);
            await quizData.refetch();
            setIsLoading(false);
        }
    };

    const inputProps = {
        errors: formErrors,
        setErrors: setFormErrors,
        onChange: handleInputChange
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit} className="p-1 mb-4 flex flex-col gap-1 w-full">
                <div className="mx-auto w-full max-w-xs">
                    <InputFile file={file} setFile={setFile} />
                </div>
                <InputText {...inputProps} name="title" placeholder="Treść pytania" value={currentQuestionData.title} />
                <span className="flex">
                    <div className="w-8 flex justify-center items-end mr-2">
                        <BsArrow90DegDown />
                    </div>
                    <span className={clsx("", { "text-rose-600": formErrors.includes("correctAnswer"), "text-light": !formErrors.includes("correctAnswer") })}>Wybierz prawidłową odpowiedź</span>
                </span>
                {["A", "B", "C", "D"].map(option => {
                    type ObjectKey = keyof typeof currentQuestionData;
                    const key = `answer${option}` as ObjectKey;
                    return (
                        <div className="flex items-center gap-2 w-full" key={key}>
                            <Checkbox handleClick={() => setCorrectAnswer(option)} checked={currentQuestionData.correctAnswer === option} />
                            <InputText {...inputProps} name={`answer${option}`} placeholder={`Odpowiedź ${option}`} value={currentQuestionData[key]} />
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
