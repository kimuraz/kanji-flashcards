<script setup lang="ts">
import HeaderWithDrawer from "./components/HeaderWithDrawer.vue";
</script>

<template>
  <HeaderWithDrawer/>
  <main>
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
