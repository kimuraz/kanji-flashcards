import {createWebHistory, createRouter} from "vue-router";

import HomeView from "./views/HomeView.vue";
import KanjiDetailView from "./views/KanjiDetailView.vue";

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
    }
];

export default createRouter({
    history: createWebHistory(),
    routes,
});