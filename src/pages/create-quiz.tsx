import React, { useState } from "react";
import Container from "../modules/common/Container";
import NewQuizForm from "../modules/NewQuizForm";

const CreateQuiz = () => {
    return (
        <Container>
            <div className="w-full max-w-lg flex-1">
                <NewQuizForm />
            </div>
        </Container>
    );
};

export default CreateQuiz;
