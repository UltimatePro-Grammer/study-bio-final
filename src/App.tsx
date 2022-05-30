import React, { useState } from "react";
import Question, { QuestionT } from "./Question/Question";
import { questionBank } from "./QuestionBank";
import { useOnMount } from "./utils";

function App() {
    const [description, setDescription] = useState<
        QuestionT["description"] | null
    >(null);
    const [answers, setAnswers] = useState<QuestionT["answers"] | null>(null);
    const [questionId, setQuestionId] = useState<QuestionT["id"] | null>(null);
    const [questionNumber, setQuestionNumber] = useState(0);

    const newQuestion = () => {
        const question = questionBank.nextQuestion();
        if (!question) {
            setDescription(null);
            return;
        }

        const { description, answers, id } = question;
        setDescription(description);
        setAnswers(answers);
        setQuestionId(id);
        setQuestionNumber(questionNumber + 1);
    };

    useOnMount(() => {
        newQuestion();
    });

    return (
        <div className="App flex items-center flex-wrap flex-col">
            <div className="mt-3">
                <label htmlFor="quiz-source" className="mr-3 font-bold text-xl">
                    Quiz Source:
                </label>
                <select
                    id="quiz-source"
                    className="border rounded-md p-1 w-32 select-none cursor-pointer overflow-ellipsis overflow-hidden text-lg"
                    onChange={(e) => {
                        questionBank.load(e.target.value);
                        newQuestion();
                        setQuestionNumber(1);
                    }}
                >
                    <option value="all">All</option>
                    <option value="Cell Division">Cell Division</option>
                </select>
            </div>

            <div className="mt-2">
                <input
                    type="checkbox"
                    className="cursor-pointer"
                    id="starred-only"
                    onChange={(event) => {
                        if (event.target.checked) {
                            questionBank.setStarredOnly();
                        } else {
                            questionBank.reload();
                        }
                        newQuestion();
                        setQuestionNumber(1);
                    }}
                ></input>
                <label
                    htmlFor="starred-only"
                    className="ml-1.5 font-bold text-lg cursor-pointer"
                >
                    Starred Only
                </label>
            </div>

            {description && answers && questionId ? (
                <Question
                    description={description}
                    answers={answers}
                    questionNumber={questionNumber}
                    onNextQuestion={() => newQuestion()}
                    id={questionId}
                />
            ) : (
                <p className="mt-4">
                    No questions available with these settings!
                </p>
            )}
        </div>
    );
}

export default App;
