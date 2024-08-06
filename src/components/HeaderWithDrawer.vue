<script setup lang="ts">
import Drawer from "primevue/drawer";
import Button from "primevue/button";

import { ref } from "vue";

const visible = ref(false);
</script>

<template>
  <Drawer v-model:visible="visible" header="Drawer">
    <Menu></Menu>
  </Drawer>

  <header class="header">
    <Button icon="pi pi-bars" @click="visible = true" v-if="false"/>

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
</style>