<script setup lang="ts">
import Fieldset from "primevue/fieldset";
import ProgressSpinner from "primevue/progressspinner";
import Tag from "primevue/tag";

import { useRouter } from "vue-router";
import {computed, ref, watch} from "vue";
import {Kanji} from "../types/kanji.ts";
import {getKanjiDetails} from "../services/kanjiApi.ts";
import {useKanjiStore} from "../store/kanjiStore.ts";

const router = useRouter();
const store = useKanjiStore();
const kanji = computed(() => router.currentRoute.value.params.kanji);
const kanjiDetails = computed(() => store.kanjiDetails[(kanji.value as string) || '']);

watch(kanji, async (kanji) => {
  if (!kanji) {
    return;
  }
  await store.loadKanjiDetails(kanji as string);
}, { immediate: true });
</script>

<template>
  <main>
    <ProgressSpinner v-if="!kanjiDetails" />

    <template v-else>
      <h2>{{kanjiDetails.kanji}}</h2>

      <div class="info-tags-list">
        <Tag severity="info" :value="`Grade: ${kanjiDetails.grade}`" rounded/>
        <Tag severity="info" :value="`Stroke count: ${kanjiDetails.stroke_count}`" rounded/>
      </div>

      <Fieldset legend="Meanings">
        <div class="info-tags-list">
          <Tag
              severity="secondary"
              v-for="meaning in kanjiDetails.meanings"
              :key="meaning"
              :value="meaning"
          />
        </div>
      </Fieldset>

      <Fieldset legend="Kun readings">
        <div class="info-tags-list">
          <Tag
              severity="warn"
              v-for="kunReading in kanjiDetails.kun_readings"
              :key="kunReading"
              :value="kunReading"
              rounded
          />
        </div>
      </Fieldset>

      <Fieldset legend="On readings">
        <div class="info-tags-list">
          <Tag
              severity="success"
              v-for="onReading in kanjiDetails.on_readings"
              :key="onReading"
              :value="onReading"
              rounded
          />
        </div>
      </Fieldset>
    </template>
  </main>
</template>

<style scoped>
.info-tags-list {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
</style>