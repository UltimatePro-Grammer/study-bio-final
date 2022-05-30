import React, { useEffect, useState } from "react";
import Question, { QuestionT } from "./Question/Question";
import allQuestions from "./questions.json";

function App() {
    const [quizSource, setQuizSource] = useState("all");
    const [description, setDescription] = useState<
        QuestionT["description"] | null
    >(null);
    const [answers, setAnswers] = useState<QuestionT["answers"] | null>(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const newQuestion = (quizSource: string, questionIndex: number) => {
        const questions: QuestionT[] =
            quizSource === "all"
                ? Object.values(allQuestions).flat()
                : (allQuestions as any)[quizSource];

        const question = questions[questionIndex];

        setDescription(question.description);
        setAnswers(question.answers);

        setQuestionIndex(questionIndex + 1);
    };

    useEffect(() => {
        newQuestion("all", 0);
    }, []);

    return (
        <div className="App flex items-center py-3 flex-wrap flex-col">
            <div>
                <label htmlFor="quiz-source" className="mr-3 font-bold text-xl">
                    Quiz Source:
                </label>
                <select
                    id="quiz-source"
                    className="border rounded-md p-1 w-32 select-none cursor-pointer overflow-ellipsis overflow-hidden text-lg"
                    onChange={(e) => {
                        setQuizSource(e.target.value);
                        setQuestionIndex(0);
                        newQuestion(e.target.value, 0);
                    }}
                >
                    <option value="all">All</option>
                    <option value="Cell Division">Cell Division</option>
                </select>
            </div>

            {description && answers ? (
                <Question
                    description={description}
                    answers={answers}
                    questionNumber={questionIndex}
                    starred={false}
                    onStarredChange={(newval) => {}}
                    onNextQuestion={() =>
                        newQuestion(quizSource, questionIndex)
                    }
                />
            ) : (
                <p className="mt-4">Loading questions...</p>
            )}
        </div>
    );
}

export default App;
