<script setup lang="ts">
import Drawer from "primevue/drawer";
import Button from "primevue/button";
import Menu from "primevue/menu";
import InputText from "primevue/inputtext";
import InputGroup from "primevue/inputgroup";
import {MenuItem} from "primevue/menuitem";

import {computed, ref} from "vue";
import { useConfirm } from "primevue/useconfirm";
import {useKanjiStore} from "../store/kanjiStore.ts";
import {useRouter} from "vue-router";

const visible = ref(false);

const router = useRouter();
const store = useKanjiStore();
const menuItems = computed<MenuItem[]>(() => {
  return store.kanjiDecks.map(deck => ({
    id: deck.id,
    label: `${deck.name} (${deck.kanjis.length})`,
    command: () => {
      router.push({ name: 'deck', params: { deckId: deck.id } });
    },
  }));
});

const newDeckName = ref<string>('');
const newDeck = () => {
  if (!newDeckName.value) {
    return;
  }
  store.newDeck(newDeckName.value);
  newDeckName.value = '';
};

const confirm = useConfirm();
const deleteDeck = (deckId: string) => {
  confirm.require({
    message: 'Are you sure you want to delete this deck?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Delete'
    },
    accept: () => {
      store.deleteDeck(deckId);
    },
    reject: () => {
      return;
    },
  });
};
</script>

<template>
  <Drawer v-model:visible="visible" header="My decks">
    <div class="new-deck">
      <label for="deckName">New deck name</label>
      <InputGroup>
        <InputText v-model="newDeckName" id="deckName" @keyup.enter="newDeck" />
        <Button class="del-deck-btn" label="Save" @click="newDeck" />
      </InputGroup>
    </div>

    <Menu :model="menuItems" v-if="menuItems.length">
      <template #item="{ item }">
        <div class="deck-menu-item">
          <p>{{ item.label }}</p>

          <Button size="small" severity="danger" icon="pi pi-times" @click="deleteDeck(item.id)"/>
        </div>
      </template>
    </Menu>
  </Drawer>

  <header class="header">
    <Button icon="pi pi-bars" @click="visible = true"/>

    <router-link :to="{ name: 'home' }">
      <h1>Kanji Flashcards</h1>
    </router-link>

  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0.25rem;
  margin-bottom: 1rem;
}

.new-deck {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: start;
}

.deck-menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0.5rem;
}

.del-deck-btn {
  margin-left: auto;
}
</style>