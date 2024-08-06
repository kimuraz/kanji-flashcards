import {createWebHistory, createRouter} from "vue-router";

import HomeView from "./views/HomeView.vue";
import KanjiDetailView from "./views/KanjiDetailView.vue";
import DeckView from "./views/DeckView.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/kanjis/:kanji",
        name: "kanjiDetails",
        component: KanjiDetailView,
    },
    {
        path: "/decks/:deckId",
        name: "deck",
        component: DeckView,
    }
];

export default createRouter({
    history: createWebHistory(),
    routes,
});