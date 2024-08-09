<script setup lang="ts">
import {onBeforeMount, onBeforeUnmount} from "vue";
import ConfirmDialog from 'primevue/confirmdialog';

import HeaderWithDrawer from "./components/HeaderWithDrawer.vue";
import {useKanjiStore} from "./store/kanjiStore.ts";
import SearchKanji from "./components/SearchKanji.vue";

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
    <section class="search-container">
      <SearchKanji />
    </section>

    <router-view/>
  </main>
</template>

<style>
.main {
  padding: 0.5rem;
}

.search-container {
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .main {
    padding: 1rem;
  }
}
</style>
