<script setup lang="ts">
import Card from "primevue/card";
import Button from "primevue/button";
import Divider from "primevue/divider";
import {Kanji} from "../types/kanji.ts";
import {ref} from "vue";

interface Props {
  kanji: Kanji;
}

const props = defineProps<Props>();

const revealDetails = ref<boolean>(false);
</script>

<template>
  <Card>
    <template #content>
      <div class="kanji-card-play">
        <h2 class="xxxl-text">{{ props.kanji.kanji }}</h2>

        <Divider layout="vertical" />

        <div>
          <Button
              icon="pi pi-eye"
              @click="revealDetails = !revealDetails"
          />

          <div v-if="revealDetails">
            <p>{{ props.kanji.meanings.join(' - ')}}</p>
            <p>{{ props.kanji.on_readings.join(' - ') }}</p>
            <p>{{ props.kanji.kun_readings.join(' - ') }}</p>
          </div>

          <div v-if="false">
            <slot />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style>
.kanji-card-play {
  display: flex;
  flex-wrap: nowrap;
  max-width: 90vw;
  flex-direction: column;
  margin: auto;
}
.xxxl-text {
  font-size: 5rem;
}

@media (min-width: 768px) {
  .kanji-card-play {
    flex-direction: row;
    max-width: 60vw;
  }
}
</style>