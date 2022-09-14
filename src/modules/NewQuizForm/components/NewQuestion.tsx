import React, { useState } from "react";
import Button from "../../common/Button";
import Checkbox from "../../common/Checkbox";
import InputFile from "../../common/InputFile";
import InputText from "../../common/InputText";
import { BsArrow90DegDown } from "react-icons/bs";

const question = {
    title: "",
    answerA: "",
    answerB: "",
    answerC: "",
    answerD: "",
    correctAnswer: ""
};

const NewQuestion = () => {
    const [newQuestion, setNewQuestion] = useState(question);
    const [file, setFile] = useState<any>(null);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewQuestion(prev => ({ ...prev, [name]: value }));
    };

    const setCorrectAnswer = (option: string) => {
        setNewQuestion(prev => ({ ...prev, correctAnswer: option }));
    };

    return (
        <div className="p-1 mb-4 flex flex-col gap-1">
            <div className="mx-auto w-full max-w-xs">
                <InputFile file={file} setFile={setFile} />
            </div>
            <InputText name="title" placeholder="Treść pytania" value={newQuestion.title} onChange={handleInputChange} />
            <span className="flex">
                <div className="w-8 flex justify-center items-end mr-2">
                    <BsArrow90DegDown />
                </div>
                Wybierz prawidłową odpowiedź
            </span>
            {["A", "B", "C", "D"].map(option => {
                type ObjectKey = keyof typeof newQuestion;
                const key = `answer${option}` as ObjectKey;
                return (
                    <div className="flex items-center gap-2 w-full" key={key}>
                        <Checkbox handleClick={() => setCorrectAnswer(option)} checked={newQuestion.correctAnswer === option} />
                        <InputText name={`answer${option}`} placeholder={`Odpowiedź ${option}`} value={newQuestion[key]} onChange={handleInputChange} />
                    </div>
                );
            })}
            <Button>Dodaj pytanie</Button>
        </div>
    );
};

export default NewQuestion;
