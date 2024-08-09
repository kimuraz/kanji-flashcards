<script setup lang="ts">
import ProgressSpinner from "primevue/progressspinner";
import {onMounted, ref} from "vue";

import KanjiList from "../components/KanjiList.vue";
import {useKanjiStore} from "../store/kanjiStore.ts";

const isLoading = ref(true);

const store = useKanjiStore();
onMounted(async () => {
  isLoading.value = true;
  if (!Object.keys(store.kanjiByGrade).length) {
    await store.loadKanjiByGrade();
  }
  isLoading.value = false;
});
</script>

<template>
  <ProgressSpinner v-if="isLoading" />

  <div v-else class="kanji-content">
    <KanjiList
        v-for="(kanjiList, grade) in store.kanjiByGrade"
        :title="`Grade - ${grade}`"
        :kanjis="kanjiList"
    />
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