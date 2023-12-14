<template>
  <div class="h1">
    {{ title }}
  </div>
  {{ console.log("profile.favorite_categories") }}

  <div v-if="profile">
    <div v-if="profile.favorite_categories.length !== 0">
      <div>
        <p>These articles are filtered from your choices!</p>
      </div>
      <div v-for="article in Articles" :key="article.id" class="container text-center w-50 mx-auto mb-4">
        <div v-if="profile.favorite_categories.includes(article.Article_category)"  class="card mb-4">
        <router-link :to="`/article/${article.id}`" style="text-decoration: none;">
          <div class="card-header bg-warning text-light">
            <p class="font-weight-bold">{{ article.Article_title }}</p>
          </div>
          <div class="card-body">
            <p><strong>Category:</strong> {{ article.Article_category }}</p>
            <p>{{ article.Article_summary }}</p>
          </div>
          <div class="card-footer text-muted">
              {{ article.Article_date }}
          </div>
        </router-link>
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
