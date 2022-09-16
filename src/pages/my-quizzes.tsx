import Link from "next/link";
import React from "react";
import LoadingSpinner from "../modules/common/LoadingSpinner";
import QuizPreview from "../modules/QuizPreview";
import { trpc } from "../utils/trpc";

const MyQuizzes = () => {
    const userQuizzes = trpc.useQuery(["protected.getUserQuizzes"]);
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl py-4">Twoje Quizy</h1>
            {userQuizzes.isLoading && (
                <div>
                    <LoadingSpinner />
                </div>
            )}
            <div className="grid grid-cols-2 small:grid-cols-4 gap-1">
                {userQuizzes.isSuccess &&
                    userQuizzes.data.map(quiz => (
                        <Link href={`/edit-quiz/${quiz.id}`} key={quiz.id}>
                            <a>
                                <QuizPreview quiz={quiz} />
                            </a>
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default MyQuizzes;
