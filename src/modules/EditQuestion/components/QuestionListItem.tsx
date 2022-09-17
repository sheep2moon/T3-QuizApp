import { Question } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { getImageUrl } from "../../../utils/getImageUrl";
import Button from "../../common/Button";
import LoadingSpinner from "../../common/LoadingSpinner";

type QuestionItemProps = {
    question: Question;
    deleteQuestion: () => void;
    isLoading: boolean;
};

const QuestionListItem = ({ question, deleteQuestion, isLoading }: QuestionItemProps) => {
    return (
        <div className="flex flex-col m-2 bg-light/10 rounded-lg h-48 justify-between p-2">
            {isLoading ? (
                <div className="mx-auto my-auto">
                    <LoadingSpinner />
                </div>
            ) : (
                <>
                    <div className="flex items-center p-2">
                        <div className="relative w-12 h-12 mr-4">
                            <Image src={getImageUrl(question.imageId)} className="rounded-md" alt="do pytania" layout="fill" />
                        </div>

                        <div className="gap-1 ml-auto flex items-center">
                            <Button variant="secondary">Edytuj</Button>
                            <Button onClick={deleteQuestion} variant="secondary">
                                Usuń
                            </Button>
                        </div>
                    </div>
                    <span className="bg-primary/20 p-1">{question.title}</span>
                    <div className="grid grid-cols-2">
                        {["A", "B", "C", "D"].map(option => {
                            type ObjectKey = keyof typeof question;
                            const key = `answer${option}` as ObjectKey;
                            return (
                                <div className={clsx("flex p-2", { "text-secondary": question.correctAnswer === option })} key={`${question.id}-${key}`}>
                                    {option}. {question[key]}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default QuestionListItem;
