<script setup lang="ts">
import ProgressSpinner from "primevue/progressspinner";
import {onMounted, ref} from "vue";
import {getKanjiByGrade} from "../services/kanjiApi.ts";

import KanjiList from "../components/KanjiList.vue";

const isLoading = ref(true);
const kanjisLists = ref<{ [grade: number]: string[]}>({});

onMounted(async () => {
  isLoading.value = true;
  for (let i = 1; i <= 6; i++) {
    kanjisLists.value[i] = await getKanjiByGrade(i);
  }
  // Special case for grade 8
  kanjisLists.value[8] = await getKanjiByGrade(8);
  isLoading.value = false;
});
</script>

<template>
  <ProgressSpinner v-if="isLoading" />

  <div v-else class="kanji-content">
    <KanjiList
        v-for="(kanjiList, grade) in kanjisLists"
        :title="`Grade - ${grade}`"
        :kanjis="kanjiList"
    />
  </div>
</template>

<style scoped>

</style>