<template>
  <div class="h1">
    {{ title }}
  </div>
    <div v-for="article in Articles" :key="article.id">
      <p>hi</p>
      {{ console.log(article) }}
      <p>{{ article.id }}</p>
      <p>{{ article.Article_title }}</p>
      <p>{{ article.Article_summary }}</p>
      <p>{{ article.Article_category }}</p>
      <p>{{ article.Aricle_date }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useArticleStore } from '../stores/articleStore';

export default defineComponent({
  setup() {
    const articleStore = useArticleStore();

    return {
      Articles: articleStore.Articles,
      title: "Main Page",
    };
  },
});
</script>

<style scoped>
</style>
