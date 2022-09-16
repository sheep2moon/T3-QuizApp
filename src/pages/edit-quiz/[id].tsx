import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Container from "../../modules/common/Container";
import LoadingSpinner from "../../modules/common/LoadingSpinner";
import EditQuizQuestions from "../../modules/EditQuestion";
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
            {quiz.isSuccess && quiz.data && (
                <div className="w-full max-w-lg">
                    <div className="flex justify-center text-xl p-2 border-b-2 border-light/10 mb-2">
                        <span className="ml-4">{quiz.data?.title}</span>
                    </div>
                    <EditQuizQuestions quizId={id} />
                </div>
            )}
        </Container>
    );
};

export default EditQuiz;
