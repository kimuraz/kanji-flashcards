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
        <router-link
            :to="{ name: 'kanjiDetails', params: { kanji }}"
        >
          <KanjiCardSimple
              :kanji="kanji"
          />
        </router-link>
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
  flex-wrap: wrap;
  margin: 0;
}
</style>