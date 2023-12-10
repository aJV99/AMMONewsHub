<template>
  <div class="h1">
    {{ title }}
  </div>
  <select class="form-select" v-model="filter">
    <option :value="null">Choose Category</option>
    <option v-for="article in Articles" :value="article.Article_category">{{ article.Article_category }} </option>

  </select>
  <p>{{ console.log(filter) }}</p>
  <div v-if="filter !== null">
    <div v-for="article in Articles" :key="article.id" class="container border border-dark text-center">
      
        <div v-if="filter == article.Article_category">
          <p>{{ article.id }}</p>
          <p class="font-weight-bold">{{ article.Article_title }}</p>
          <p>{{ article.Article_summary }}</p>
          <p>{{ article.Article_category }}</p>
          <p>{{ article.Aricle_date }}</p>  
        </div>
      </div>
  </div>

  <div v-else>
    <div v-for="article in Articles" :key="article.id" class="container border border-dark text-center">
        <p>{{ article.id }}</p>
        <p class="font-weight-bold">{{ article.Article_title }}</p>
        <p>{{ article.Article_summary }}</p>
        <p>{{ article.Article_category }}</p>
        <p>{{ article.Aricle_date }}</p>  
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
    filter: null
  }},
  


});
</script>

<style scoped>
</style>
