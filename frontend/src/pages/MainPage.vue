<template>
  <div class="h1">
    {{ title }}
  </div>
  {{ console.log("profile.favorite_categories") }}

  <div v-if="profile">
    <div v-if="profile.favorite_categories.length !== 0">
      {{ console.log(profile.favorite_categories) }}
      <div v-for="article in Articles" :key="article.id" >
        <div v-if="profile.favorite_categories.includes(article.Article_category)" class="container border border-dark text-center mb-5 w-25">
        <router-link :to="`/article/${article.id}`">
          <p>{{ article.id }}</p>
          <p class="font-weight-bold">{{ article.Article_title }}</p>
          <p>{{ article.Article_summary }}</p>
          <p>{{ article.Article_category }}</p>
          <p class="font-italic">{{ article.Article_date }}</p>
        </router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-for="article in Articles" :key="article.id" class="container border border-dark text-center mb-5 w-25">
        <router-link :to="`/article/${article.id}`">
          <p>{{ article.id }}</p>
          <p class="font-weight-bold">{{ article.Article_title }}</p>
          <p>{{ article.Article_summary }}</p>
          <p>{{ article.Article_category }}</p>
          <p class="font-italic">{{ article.Article_date }}</p>
        </router-link>
        </div>
  </div> 
  </div>
  <div v-else>
      <div v-for="article in Articles" :key="article.id" class="container border border-dark text-center mb-5 w-25">
        <router-link :to="`/article/${article.id}`">
          <p>{{ article.id }}</p>
          <p class="font-weight-bold">{{ article.Article_title }}</p>
          <p>{{ article.Article_summary }}</p>
          <p>{{ article.Article_category }}</p>
          <p class="font-italic">{{ article.Article_date }}</p>
        </router-link>
        </div>
  </div> 
  

</template>


<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useArticleStore } from '../stores/articleStore';
import { useUserProfileStore } from '../stores/userProfile';


export default defineComponent({
  setup() {
    const articleStore = useArticleStore();
    const userProfileStore = useUserProfileStore();
    const profile = ref(userProfileStore.profile);

    onMounted(async () => {
              if (!userProfileStore.profile) {
                  await userProfileStore.fetchUserProfile();
              }
          });

    return {
      Articles: articleStore.Articles,
      profile,
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
