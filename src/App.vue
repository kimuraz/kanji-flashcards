<script setup lang="ts">
import ProgressSpinner from "primevue/progressspinner";
import {onMounted, provide, ref} from "vue";
import {getKanjiByGrade} from "./services/kanjiApi.ts";
import KanjiList from "./components/KanjiList.vue";

const isLoading = ref(true);
const kanjisLists = ref<{ [grade: number]: string[]}>({});

onMounted(async () => {
  isLoading.value = true;
  for (let i = 1; i <= 6; i++) {
    kanjisLists.value[i] = await getKanjiByGrade(i);
  }
  isLoading.value = false;
});
</script>

<template>
  <main>
    <ProgressSpinner v-if="isLoading" />

    <div v-else class="kanji-content">
      <KanjiList v-for="(kanjiList, grade) in kanjisLists" :title="`Grade - ${grade}`" :kanjis="kanjiList" />
    </div>
  </main>
</template>

<style>
.kanji-content {
  display: flex;
  gap: 1rem;
  flex-wrap: nowrap;
  flex-direction: column;
}
</style>
