import {defineStore} from "pinia";
import {getKanjiByGrade, getKanjiDetails} from "../services/kanjiApi.ts";
import type {Kanji, KanjiDeck} from "../types/kanji.ts";

interface KanjiStoreState {
    kanjiByGrade: Record<number, string[]>;
    kanjiDecks: KanjiDeck[];
    kanjiDetails: Record<string, Kanji>;
}

const DECK_LOCAL_STORAGE_KEY = "kanjiDeck";

export const useKanjiStore = defineStore('kanjiStore', {
    state: () => ({
        kanjiByGrade: {},
        kanjiDecks: [],
        kanjiDetails: {},
    }) as KanjiStoreState,
    actions: {
        async loadKanjiByGrade() {
            for (let i = 1; i <= 6; i++) {
               this.kanjiByGrade[i] = await getKanjiByGrade(i);
            }
            // Special case for grade 8
            this.kanjiByGrade[8] = await getKanjiByGrade(8);
        },
        async loadKanjiDeckLocalStorage() {
            const kanjiDeck = localStorage.getItem(DECK_LOCAL_STORAGE_KEY) || "[]";
            if (kanjiDeck) {
                this.kanjiDecks = JSON.parse(kanjiDeck);
                this.kanjiDecks.forEach(deck => {
                    deck.kanjis.forEach(kanji => {
                        this.kanjiDetails[kanji.kanji] = kanji;
                    });
                });
            }
        },
        async loadKanjiDetails(kanji: string) {
            if (!this.kanjiDetails[kanji]) {
                this.kanjiDetails[kanji] = await getKanjiDetails(kanji);
            }
        },
        saveKanjiDecksLocalStorage() {
            localStorage.setItem(DECK_LOCAL_STORAGE_KEY, JSON.stringify(this.kanjiDecks));
        },
        newDeck(name: string) {
            this.kanjiDecks.push({ id: Math.random().toString(36).substring(7), name, kanjis: [] });
        },
    },
})