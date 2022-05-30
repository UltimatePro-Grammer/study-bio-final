import React, { useEffect, useState } from "react";
import Question, { QuestionT } from "./Question/Question";
import allQuestions from "./questions.json";
import { isStarred, shuffleArray } from "./utils";

let quizSource = "all";
let starredOnly = false;

function App() {
    const [description, setDescription] = useState<
        QuestionT["description"] | null
    >(null);
    const [answers, setAnswers] = useState<QuestionT["answers"] | null>(null);
    const [questionId, setQuestionId] = useState<QuestionT["id"] | null>(null);
    const [questionIndex, setQuestionIndex] = useState(0);

    const newQuestion = (questionIndex: number) => {
        let questions: QuestionT[] =
            quizSource === "all"
                ? Object.values(allQuestions).flat()
                : (allQuestions as any)[quizSource];

        if (starredOnly) {
            questions = questions.filter((q) => isStarred(q.id));
        }

        if (questionIndex >= questions.length) {
            questions = shuffleArray(questions);
            questionIndex = 0;
        }

        const question = questions[questionIndex];

        if (!question) {
            setDescription(null);
            return;
        }

        setDescription(question.description);
        setAnswers(shuffleArray(question.answers));
        setQuestionId(question.id);

        setQuestionIndex(questionIndex + 1);
    };

    useEffect(() => {
        newQuestion(0);
    }, []);

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
                        quizSource = e.target.value;
                        setQuestionIndex(0);
                        newQuestion(0);
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
                        starredOnly = event.target.checked;
                        setQuestionIndex(0);
                        newQuestion(0);
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
                    questionNumber={questionIndex}
                    onNextQuestion={() => newQuestion(questionIndex)}
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
