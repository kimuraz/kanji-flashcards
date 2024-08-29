<script setup lang="ts">
import ProgressSpinner from "primevue/progressspinner";
import KanjiList from "../components/KanjiList.vue";
import { useKanjiByGrade } from '../composables/useKanjiByGrade';


const kanjiByGrade = useKanjiByGrade();
</script>

<template>
  <ProgressSpinner v-if="kanjiByGrade.isPending" />

  <div v-else class="kanji-content">
    <KanjiList v-for="(kanjiList, grade) in kanjiByGrade.data" :title="`Grade - ${grade}`" :kanjis="kanjiList" />
  </div>
</template>

<style scoped>
.kanji-content {
  display: flex;
  gap: 0.5rem;
  flex-wrap: nowrap;
  flex-direction: column;
}
</style>
