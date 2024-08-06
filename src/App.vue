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
  <main>
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
</style>
