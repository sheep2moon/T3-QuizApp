import React, { useMemo, useState } from "react";
import Container from "../modules/common/Container";
import QuizPreview from "../modules/QuizPreview";
import TextInput from "../modules/common/InputText";
import { trpc } from "../utils/trpc";

const Quizzes = () => {
    const quizzes = trpc.useQuery(["quizzes.getQuizzes"]);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredQuizes = useMemo(() => {
        return quizzes?.data?.filter(quiz => quiz.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [quizzes.data, searchQuery]);

    return (
        <Container>
            <h1 className="text-2xl mb-4">Przeglądasz wszystkie quizy</h1>
            <div className="w-full max-w-sm">
                <TextInput placeholder="Wyszukaj..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <div className="flex flex-col w-full mt-4">
                {quizzes.isLoading && <div>Loading</div>}
                <div className="grid grid-cols-2 xsmall:grid-cols-3 small:grid-cols-4 gap-2">{quizzes.isSuccess && filteredQuizes?.map(quiz => <QuizPreview key={quiz.id} quiz={quiz} />)}</div>
            </div>
        </Container>
    );
};

export default Quizzes;
