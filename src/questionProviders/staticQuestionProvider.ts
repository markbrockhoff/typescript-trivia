import type {
  Question,
  QuestionProvider,
} from '../composables/useQuestionProvider';

/**
 * Task 1: Implement the staticQuestionProvider
 *
 * 1. Define an array of type `Question` (you can import the type from "../composables/useQuestionProvider")
 * 2. Add 1-3 example questions and answers to the array (no need to be fancy, if can't think of good questions just use math, e.g.: "Whats 2 + 2?")
 * 3. Return a random question from the array within the providers `next()` function
 *    - You can use `Math.random()` to get a random number between 0 and 1 (the Math package is global no need to import it)
 *    - `Math.floor()` can be used to cut of the fractions of a number e.g. `Math.floor(3.14) === 3`
 *
 * (Bonus)
 * We want the order of answers within one question to be random as well.
 * Implement a function `shuffleAnswers()` which takes an array of answers and shuffles them using the Fisher-Yates algorithm (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle).
 * Use the function to shuffle the questions answers before returning it in the `next()` function.
 */

const questions: Question[] = [
  {
    question:
      'Which of the following is the correct way to specify that a variable count should only accept numbers in TypeScript?',
    answers: [
      { text: 'let count: number = 5;', correct: true },
      { text: 'let count: integer = 5;', correct: false },
      { text: 'let count = number 5;', correct: false },
      { text: 'var count := 5;', correct: false },
    ],
  },
  {
    question:
      'Which of the following is correct syntax for declaring an array of strings?',
    answers: [
      { text: 'let names: string[];', correct: true },
      { text: 'let names: Array<string>;', correct: true },
      { text: 'let names: [string];', correct: false },
      { text: 'let names: <string>;', correct: false },
    ],
  },
  {
    question:
      'If you have a function that performs an action but does not return any value, which return type should you use?',
    answers: [
      { text: 'void', correct: true },
      { text: 'null', correct: false },
      { text: 'empty', correct: false },
      { text: 'undefined', correct: false },
    ],
  },
];

export const staticQuestionProvider: QuestionProvider = {
  next: () => {
    const randomIndex = Math.floor(Math.random() * questions.length);

    const randomQuestion = questions[randomIndex];
    shuffleAnswers(randomQuestion.answers);

    return randomQuestion;
  },
};

const shuffleAnswers = (answers: Question['answers']) => {
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }
  return answers;
};
