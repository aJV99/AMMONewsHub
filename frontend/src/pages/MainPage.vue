<template>
  <div class="container mt-5">
    <div class="h1 text-center mb-4 text-danger">
      {{ title }}
    </div>

    <div class="form-group">
      <label for="categorySelect">Choose Category</label>
      <select id="categorySelect" class="form-select" v-model="filter">
        <option :value="null">All Categories</option>
        <option v-for="article in Articles" :key="article.id" :value="article.Article_category">
          {{ article.Article_category }}
        </option>
      </select>
    </div>

    <p>{{ console.log(filter) }}</p>

    <div v-if="filter !== null">
      <div v-for="article in Articles" :key="article.id" class="container text-center w-50 mx-auto mt-4">
        <div v-if="filter == article.Article_category" class="card mb-4">
          <div class="card-header bg-warning text-light">
            {{ article.Article_title }}
          </div>
          <div class="card-body">
            <p><strong>Category:</strong> {{ article.Article_category }}</p>
            <p>{{ article.Article_summary }}</p>
          </div>
          <div class="card-footer text-muted">
            {{ article.Article_date }}
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div v-for="article in Articles" :key="article.id" class="container text-center w-50 mx-auto mb-4">
        <router-link :to="`/article/${article.id}`" style="text-decoration: none;">
          <div class="card">
            <div class="card-header bg-warning text-light">
              {{ article.Article_title }}
            </div>
            <div class="card-body">
              <p><strong>Category:</strong> {{ article.Article_category }}</p>
              <p>{{ article.Article_summary }}</p>
            </div>
            <div class="card-footer text-muted">
              {{ article.Article_date }}
            </div>
          </div>
        </router-link>
      </div>
    </div>
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
  data(){
    return{
    filter: null,
  }},
  


});
</script>

<style scoped>
</style>
