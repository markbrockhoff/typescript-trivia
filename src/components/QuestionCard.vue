<script lang="ts" setup>
import {
  OnyxButton,
  OnyxCard,
  OnyxHeadline,
  OnyxLoadingIndicator,
} from 'sit-onyx';
import { ref } from 'vue';
import { useQuestionProvider } from '../composables/useQuestionProvider';

const { currentQuestion, isLoading, error, fetchNextQuestion } =
  useQuestionProvider({
    next: async () => ({
      question: 'Whats 2+2?',
      answers: [
        { text: '2', correct: false },
        { text: '4', correct: true },
        { text: '42', correct: false },
        { text: '-3', correct: false },
      ],
    }),
  });

const showSolution = ref(false);
const submitAnswer = () => (showSolution.value = true);
const requestNextQuestion = async () => {
  showSolution.value = false;
  await fetchNextQuestion();
};
</script>

<template>
  <OnyxCard v-if="currentQuestion && !isLoading" class="card">
    <OnyxHeadline is="h2">{{ currentQuestion.question }}</OnyxHeadline>

    <div class="answers">
      <OnyxButton
        class="answer"
        :class="{
          'answer--correct': answer.correct,
          'answer--incorrect': !answer.correct,
        }"
        v-for="answer in currentQuestion.answers"
        :key="answer.text"
        :label="answer.text"
        :mode="showSolution ? 'default' : 'outline'"
        :disabled="showSolution"
        @click="submitAnswer"
      />
    </div>

    <OnyxButton
      class="next-question-button"
      label="Next Question"
      :disabled="!showSolution"
      @click="requestNextQuestion"
    />
  </OnyxCard>

  <OnyxCard v-else-if="isLoading" class="card card--loading">
    <OnyxLoadingIndicator type="circle" />
  </OnyxCard>

  <OnyxCard v-else class="card card--error">
    {{ error }}
    <OnyxButton label="Try again" @click="requestNextQuestion" />
  </OnyxCard>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  text-align: center;

  border: 2px solid var(--onyx-color-base-primary-500);
  box-shadow:
    0 0 4px var(--onyx-color-base-primary-500),
    0 0 12px var(--onyx-color-base-primary-500);
}

.card--loading,
.card--error {
  align-items: center;
  justify-content: center;
}

.answers {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.answer {
  width: 100%;
  --onyx-button-text-color-disabled: var(
    --onyx-color-text-icons-neutral-button
  );
}
.answer--correct {
  --onyx-button-background-color-disabled: var(--onyx-color-base-success-400);
}
.answer--incorrect {
  --onyx-button-background-color-disabled: var(--onyx-color-base-danger-400);
}

.next-question-button {
  width: 100%;
  margin-top: auto;
}
</style>
