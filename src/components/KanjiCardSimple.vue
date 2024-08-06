<script setup lang="ts">
import Card from "primevue/card";

interface Props {
  kanji: string;
}

defineProps<Props>();
</script>

<template>
  <Card class="kanji-card-simple">
    <template #content>
      <p class="kanji-text">{{kanji}}</p>
    </template>
  </Card>
</template>

<style scoped>
.kanji-card-simple {
  cursor: pointer;
  transition: background-color 0.3s;
}

.kanji-card-simple:hover {
  background-color: #f0f0f0;
}

.kanji-text {
  font-size: 2rem;
  text-align: center;
  margin: 0;
  padding: 0;
}
</style>