<template>
  <div class="h1">
    {{ title }}
  </div>
    <div v-for="article in Articles" :key="article.id">
      <p>hi</p>
      {{ console.log(article) }}
      {{ article.id }}
    </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { useArticleStore } from '../stores/articleStore';
    export default defineComponent({
      setup() {
          const articleStore = useArticleStore();
  
          onMounted(async () => {
            await articleStore.fetchArticles();
              
          });
  



          return {
            Articles: articleStore.Articles
          };
      },
        data() {
            return {
                title: "Main Page",
            }
        }
    })
</script>

<style scoped>
</style>
