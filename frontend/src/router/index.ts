// Example of how to use Vue Router

import { createRouter, createWebHistory } from "vue-router";

// 1. Define route components.
// These can be imported from other files
import MainPage from "../pages/MainPage.vue";
import OtherPage from "../pages/OtherPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import ArticlePage from "../pages/ArticlePage.vue";
import { useArticleStore } from "../stores/articleStore";
import { useCommentsStore } from "../stores/commentsStore";
import { queuePostFlushCb } from "vue";

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
        console.log("mian before enter");
        const articleStore = useArticleStore();
        if (!articleStore.Articles) {
          await articleStore.fetchArticles();
        }
        next();
      },
    },

    {
      path: "/blogs/",
      name: "Blogs",
      component: ArticlePage,
      beforeEnter: async (_to, _from, next) => {
        const articleStore = useArticleStore();
        if (!articleStore.Articles) {
          await articleStore.fetchArticles();
        }
        const commentsStore = useCommentsStore();
        const queryParam = _to.query.myQueryParam;
        console.log(queryParam);
        await commentsStore.fetchComments(1);
        next();
      },
    },
    { path: "/other/", name: "Other Page", component: OtherPage },
    { path: "/profile", name: "Profile Page", component: ProfilePage },
  ],
});

export default router;
