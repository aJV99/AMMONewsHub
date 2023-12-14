// Example of how to use Vue Router

import { createRouter, createWebHistory } from "vue-router";

// 1. Define route components.
// These can be imported from other files
import MainPage from "../pages/MainPage.vue";
import OtherPage from "../pages/OtherPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import ArticlePage from "../pages/ArticlePage.vue";
import { useArticleStore } from "../stores/articleStore";

let base =
  import.meta.env.MODE == "development" ? import.meta.env.BASE_URL : "";

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const router = createRouter({
  history: createWebHistory(base),
  routes: [
    { path: "/", redirect: { name: "Main Page" } },
    {
      path: "/main",
      name: "Main Page",
      component: MainPage,
      beforeEnter: async (_to, _from, next) => {
        console.log("main before enter");
        const articleStore = useArticleStore();
        if (!articleStore.Articles) {
          await articleStore.fetchArticles();
        }
        next();
      },
    },
    { path: "/other/", name: "Other Page", component: OtherPage },
    { path: "/profile", name: "Profile Page", component: ProfilePage },
    { path: "/article/:id", name: "Article Page", component: ArticlePage },
  ],
});

export default router;
