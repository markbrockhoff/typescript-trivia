<script lang="ts" setup>
import { OnyxHeadline } from 'sit-onyx';
import QuestionCard from './components/QuestionCard.vue';
</script>

<template>
  <div class="app">
    <div class="title">
      <img
        class="title__icon"
        src="./assets/TypeScript.svg"
        alt="Typescript Icon"
      />
      <OnyxHeadline is="h1">Typescript Trivia</OnyxHeadline>
    </div>

    <QuestionCard />
  </div>
</template>

<style scoped>
.app {
  height: 100dvh;
  box-sizing: border-box;

  max-width: 993px; /* md breakpoint of onyx */
  padding: 2rem;
  margin: 0 auto;

  display: grid;
  grid-template-rows: auto 1fr;
  gap: 2rem;
}

.title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.title__icon {
  height: 2.5rem;
}
</style>
