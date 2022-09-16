import { useRouter } from "next/router";
import React from "react";
import Container from "../../modules/common/Container";
import LoadingSpinner from "../../modules/common/LoadingSpinner";
import NewQuestionForm from "../../modules/NewQuestionForm";
import { trpc } from "../../utils/trpc";

const EditQuiz = () => {
    const { query } = useRouter();
    const id = query.id as string;
    const quiz = trpc.useQuery(["quizzes.getQuizById", { id }]);

    return (
        <Container>
            {quiz.isLoading && (
                <div>
                    <LoadingSpinner />
                </div>
            )}
            {quiz.isSuccess && (
                <div className="w-full max-w-lg">
                    <span>{quiz.data?.title}</span>
                    <NewQuestionForm />
                </div>
            )}
        </Container>
    );
};

export default EditQuiz;
