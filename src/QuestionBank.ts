import { QuestionT } from "./Question/Question";
import allQuestions from "./questions.json";
import { isStarred, shuffleArray } from "./utils";

class QuestionBank {
    quizSource = "all";
    bank: QuestionT[] = [];

    constructor() {
        this.reload();
    }

    load(quizSource: string) {
        this.quizSource = quizSource;
        if (quizSource === "all") {
            this.bank = Object.values(allQuestions).flat().slice(0);
            return;
        }
        this.bank = (allQuestions as any)[quizSource].slice(0);
    }
    shuffleBank() {
        this.bank = shuffleArray(this.bank);
    }
    nextQuestion(): QuestionT | null {
        const question = this.bank.shift();
        if (!question) {
            return null;
        }
        this.bank.push(question);

        return question;
    }

    starredOnly = false;
    setStarredOnly() {
        this.starredOnly = true;
        this.updateStarred();
    }
    updateStarred() {
        if (this.starredOnly) {
            this.bank = this.bank.filter((q) => isStarred(q.id));
        }
    }
    reload() {
        this.starredOnly = false;
        this.load(this.quizSource);
    }
}

export const questionBank = new QuestionBank();
