import { onBeforeMount, ref } from 'vue';

/**
 * The type of a question, it consists of the question itself as well as
 * an array of possible answers and whether they're correct or not
 */
export type Question = {
  question: string;
  answers: { text: string; correct: boolean }[];
};

/**
 * Type of a "QuestionProvider" which can be passed to the beneath composable.
 * A QuestionProvider needs to implement a "next" function returning a question,
 * it may return the value directly or a Promise e.g. if the provider needs to call an api.
 */
export type QuestionProvider = {
  next: () => Question | Promise<Question>;
};

/**
 * A Vue composable to retrieve a trivia question and its answers from the
 * given question provider.
 * It makes it easy for the consuming Vue component to manage the current state.
 */
export const useQuestionProvider = (provider: QuestionProvider) => {
  const currentQuestion = ref<Question>();
  const isLoading = ref(false);
  const error = ref<string>();

  const fetchNextQuestion = async () => {
    error.value = undefined;
    isLoading.value = true;

    try {
      // We can't be sure the provider catches all errors, so we have to wrap it in a try/catch
      currentQuestion.value = await provider.next();
      if (currentQuestion.value === undefined) {
        error.value = 'No question found';
      }
    } catch (e) {
      // The caught error is of type "unknown",
      // so we need to narrow it before we're able to access the errors message
      if (e instanceof Error) {
        error.value = e.message;
      }
    } finally {
      isLoading.value = false;
    }
  };

  // We want to start loading the first question as soon as the component consuming the composable mounts
  onBeforeMount(() => fetchNextQuestion());

  return { currentQuestion, isLoading, error, fetchNextQuestion };
};
