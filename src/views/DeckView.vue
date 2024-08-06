<script setup lang="ts">
import { useKanjiStore } from "../store/kanjiStore.ts";
import {onBeforeUnmount, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import Tag from "primevue/tag";
import Button from "primevue/button";
import KanjiCardSimple from "../components/KanjiCardSimple.vue";
import {useConfirm} from "primevue/useconfirm";

const store = useKanjiStore();

onBeforeUnmount(() => {
  store.saveKanjiDecksLocalStorage();
});

const route = useRoute();
const router = useRouter();
watch(() => route.params.deckId, () => {
  if (route.params.deckId) {
    router.push({ name: 'home' });
  }
});

const deck = store.kanjiDecks.find(deck => deck.id === route.params.deckId);

const confirm = useConfirm();
const confirmRemoveKanji = (kanji: string) => {
  confirm.require({
    message: 'Are you sure you want to remove this kanji from the deck?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Remove'
    },
    accept: () => {
      if (!deck) {
        return;
      }
      store.removeKanjiFromDeck(deck.id, kanji);
    },
    reject: () => {
      return;
    },
  });
};
</script>

<template>
  <main>
    <template v-if="deck">
      <h2>{{deck.name}}</h2>
      <Tag severity="info" :value="`Kanjis: ${deck.kanjis.length}`" rounded/>

      <div class="kanji-list">
        <div class="card-with-delete-btn" v-for="kanji in deck.kanjis" :key="kanji.kanji">
          <KanjiCardSimple :kanji="kanji.kanji"/>
          <Button
            size="small"
            severity="danger"
            @click="confirmRemoveKanji(kanji.kanji)"
          >
            Remove
          </Button>
        </div>
      </div>

      <Button
          severity="success"
          size="large"
          @click="router.push({
            name: 'quiz',
            params: { deckId: deck.id }
          })"
      >
        Start quiz
      </Button>
    </template>
  </main>
</template>

<style>
.kanji-list {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 5rem 0;
}
.card-with-delete-btn {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  border: 1px solid gray;
  padding: 0.5rem;
  border-radius: 0.5rem;
}
</style>