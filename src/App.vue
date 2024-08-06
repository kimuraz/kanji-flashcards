<script setup lang="ts">
</script>

<template>
  <header>
    <router-link :to="{ name: 'home' }">
      <h1>Kanji Flashcards</h1>
    </router-link>
  </header>
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
