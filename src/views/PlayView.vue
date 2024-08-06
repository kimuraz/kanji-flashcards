<script setup lang="ts">
import {computed, watch} from "vue";
import { useKanjiStore } from "../store/kanjiStore.ts";
import { useRoute, useRouter } from "vue-router";
import KanjiCardPlay from "../components/KanjiCardPlay.vue";
import Carousel from "primevue/carousel";

const store = useKanjiStore();

const route = useRoute();
const router = useRouter();
watch(() => route.params.deckId, () => {
  if (route.params.deckId) {
    router.push({ name: 'home' });
  }
});

const deck = store.kanjiDecks.find(deck => deck.id === route.params.deckId);

const randomKanjiList = computed(() => Array.from(deck?.kanjis || []).sort(() => Math.random() - 0.5));
</script>

<template>
  <main>
    <Carousel :num-visible="1" :value="randomKanjiList" circular>
      <template #item="slotProps">
        <KanjiCardPlay
            :kanji="slotProps.data"
        />
      </template>
    </Carousel>
  </main>
</template>