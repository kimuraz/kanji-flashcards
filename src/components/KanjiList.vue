<script setup lang="ts">
import Panel from "primevue/panel";
import KanjiCardSimple from "./KanjiCardSimple.vue";

interface Props {
  title: string;
  kanjis: string[];
}
defineProps<Props>();
</script>

<template>
  <Panel :header="`${title} (${kanjis.length})`" toggleable collapsed>
    <ul class="kanji-list">
      <li v-for="kanji in kanjis" :key="kanji">
        <KanjiCardSimple
            :kanji="kanji"
            @click="openCard(kanji)"
        />
      </li>
    </ul>
  </Panel>
</template>

<style>
.kanji-list {
  list-style-type: none;
  flex-direction: row;
  padding: 0;
  display: flex;
  gap: 1rem;
}
</style>