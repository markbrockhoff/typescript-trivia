import type { QuestionProvider } from '../composables/useQuestionProvider';

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

export const staticQuestionProvider: QuestionProvider = {
  next: () => {
    throw new Error('Static question provider is not implemented');
  },
};
