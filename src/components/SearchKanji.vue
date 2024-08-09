<script setup lang="ts">
import AutoComplete from "primevue/autocomplete";
import { ref } from "vue";
import {searchKanji} from "../services/kanjiApi.ts";
import {Kanji} from "../types/kanji.ts";
import KanjiCardSimple from "./KanjiCardSimple.vue";
import {useRouter} from "vue-router";

const query = ref('');
const results = ref<Kanji[]>([]);
const fetchResults = async () => {
  results.value = await searchKanji(query.value);
};

const router = useRouter();

interface KanjiEvent {
  value: {
    kanji: string;
  };
}
const goToKanji = (event: KanjiEvent) => {
  router.push({ name: 'kanjiDetails', params: { kanji: event.value.kanji } });
  query.value = '';
  results.value = [];
};
</script>

<template>
  <div class="search-group">
    <label for="search">Search kanji</label>
    <AutoComplete
        v-model="query"
        :suggestions="results"
        option-label="kanji"
        label="Search"
        :delay="400"
        input-id="search"
        @complete="fetchResults"
        @item-select="goToKanji"
    >
      <template #option="slotProps">
        <KanjiCardSimple :kanji="slotProps.option.kanji" />
      </template>
    </AutoComplete>
  </div>
</template>

<style scoped>
.search-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>