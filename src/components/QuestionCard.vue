<script lang="ts" setup>
import { OnyxButton, OnyxCard, OnyxHeadline } from 'sit-onyx';
import { ref } from 'vue';

type Question = {
  question: string;
  answers: { text: string; correct: boolean }[];
};

const props = defineProps<{ question: Question }>();

const emit = defineEmits<{ nextQuestionClick: [] }>();

const showSolution = ref(false);
const submitAnswer = () => (showSolution.value = true);
const requestNextQuestion = () => {
  showSolution.value = false;
  emit('nextQuestionClick');
};
</script>

<template>
  <OnyxCard class="card">
    <OnyxHeadline is="h2">{{ props.question.question }}</OnyxHeadline>

    <div class="answers">
      <OnyxButton
        class="answer"
        :class="{
          'answer--correct': answer.correct,
          'answer--incorrect': !answer.correct,
        }"
        v-for="answer in props.question.answers"
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
