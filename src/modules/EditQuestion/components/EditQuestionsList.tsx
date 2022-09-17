import { Question } from "@prisma/client";
import React, { useEffect } from "react";
import { trpc } from "../../../utils/trpc";
import QuestionListItem from "./QuestionListItem";

type EditQuestionsListProps = {
    questions: Question[];
    refetch: any;
};

const EditQuestionsList = ({ questions, refetch }: EditQuestionsListProps) => {
    const deleteMutation = trpc.useMutation(["protected.deleteQuestion"]);

    const handleDeleteQuestion = async (questionId: string) => {
        await deleteMutation.mutateAsync({ questionId });
        refetch();
    };

    return (
        <div>
            {questions.map(question => (
                <QuestionListItem isLoading={deleteMutation.isLoading} deleteQuestion={() => handleDeleteQuestion(question.id)} key={question.id} question={question} />
            ))}
        </div>
    );
};

export default EditQuestionsList;
