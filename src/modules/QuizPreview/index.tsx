import { Quiz } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { getImageUrl } from "../../utils/getImageUrl";

const QuizPreview = ({ quiz }: { quiz: Quiz }) => {
    return (
        <div className="p-2 bg-light/5 hover:bg-light/10 transition rounded-md flex flex-col items-center">
            <span className="px-2 pb-2 text-lg text-center w-full">{quiz.title}</span>
            <div className="relative w-full whitespace-pre-wrap aspect-square">
                <Image src={getImageUrl(quiz.imageId)} layout="fill" alt="quiz podgląd" className="rounded-md" />
            </div>
        </div>
    );
};

export default QuizPreview;
