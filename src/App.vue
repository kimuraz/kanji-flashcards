<script setup lang="ts">
import {onBeforeMount, onBeforeUnmount} from "vue";
import ConfirmDialog from 'primevue/confirmdialog';

import HeaderWithDrawer from "./components/HeaderWithDrawer.vue";
import {useKanjiStore} from "./store/kanjiStore.ts";

const store = useKanjiStore();

onBeforeMount(() => {
  store.loadKanjiDeckLocalStorage();
});

onBeforeUnmount(() => {
  store.saveKanjiDecksLocalStorage();
});
</script>

<template>
  <HeaderWithDrawer/>
  <main class="main">
    <ConfirmDialog/>
    <router-view/>
  </main>
</template>

<style>
.kanji-content {
  display: flex;
  gap: 1rem;
  flex-wrap: nowrap;
  flex-direction: column;
}

.main {
  padding: 1rem;
}

@media (min-width: 768px) {
  .main {
    padding: 4rem;
  }
}
</style>
