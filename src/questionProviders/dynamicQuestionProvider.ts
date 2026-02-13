import type { QuestionProvider } from '../composables/useQuestionProvider';
import { shuffleArray } from '../util/shuffleArray';

/**
 * Task 2: Fetch questions dynamically from an API
 *
 * 1. Use the Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
 *    to load one question from the Open Trivia Databases API: https://opentdb.com/api_config.php
 *    - Use "URL Encoding (RFC 3986)" as the encoding type for special characters
 * 2. The response won't match the `Question` type which needs to be returned from the `next()` function.
 *    Transform it to match the `Question` type.
 *    - Special characters within strings of the response will be URL encoded, pass them to the function `decodeURIComponent()` to decode them
 * 3. Extract the `shuffleArray()` function of the staticQuestionProvider into a shared util e.g. ../utils/shuffleArray.ts
 *    and use it for the dynamic question provider as well.
 */

/**
 * Task 3: Adding type safety and error handling
 *
 * 1. Change the type of the response to `unknown`
 * 2. Use a "type guard" to ensure the response matches our expected schema and narrow the type
 * 3. Define a custom Error "ApiError" extending the default "Error" class, add a parameter "isRetryable" to it
 * 4. Check if the status code of the response is 429 (too many requests) and throw a retryable ApiError if so
 * 5. In the dynamicQuestionProvider catch the error and narrow it's type, if it's a retryable ApiError wait 5s and try fetching the question again
 *    - You can use the "instanceOf" operator to check if something is the instance of a class e.g. `something instanceOf Error`
 *    - To sleep / wait 5s in JS create a new promise which resolves after 5s e.g.: `await new Promise((resolve) => setTimeout(resolve, 5_000))`
 */

type ApiResponse = {
  results: {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }[];
};
const isApiResponse = (data: unknown): data is ApiResponse => {
  if (
    !data ||
    typeof data !== 'object' ||
    !('results' in data) ||
    !Array.isArray(data.results)
  ) {
    return false;
  }

  return data.results.every(
    (result) =>
      !!result &&
      typeof result === 'object' &&
      'question' in result &&
      typeof result.question === 'string' &&
      'correct_answer' in result &&
      typeof result.correct_answer === 'string' &&
      Array.isArray(result.incorrect_answers) &&
      result.incorrect_answers.every(
        (answer: unknown) => typeof answer === 'string',
      ),
  );
};

const fetchQuestion = async () => {
  const res = await fetch(
    'https://opentdb.com/api.php?amount=1&encode=url3986',
  );
  const data: unknown = await res.json();

  if (!isApiResponse(data))
    throw new Error(`Invalid API response: ${JSON.stringify(data)}`);

  const question = data.results[0];
  const answers = [question.correct_answer, ...question.incorrect_answers].map(
    (answer, i) => ({
      text: decodeURIComponent(answer),
      correct: i === 0,
    }),
  );

  return {
    question: decodeURIComponent(question.question),
    answers: shuffleArray(answers),
  };
};

export const dynamicQuestionProvider: QuestionProvider = {
  next: async () => {
    return await fetchQuestion();
  },
};
