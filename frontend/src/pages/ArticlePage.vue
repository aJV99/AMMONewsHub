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
    <div v-for="article in Articles" :key="article.id" class="container text-center  w-25">
      
        <div v-if="filter == article.Article_category" class="mb-5 border border-dark">
          <p>{{ article.id }}</p>
          <p class="font-weight-bold">{{ article.Article_title }}</p>
          <p>{{ article.Article_summary }}</p>
          <p>{{ article.Article_category }}</p>
          <p class="font-italic">{{ article.Article_date }}</p>  
        </div>
      </div>
  </div>

  <div v-else>
    <div v-for="article in Articles" :key="article.id" class="container border border-dark text-center mb-5 w-25">
        <p>{{ article.id }}</p>
        <p class="font-weight-bold">{{ article.Article_title }}</p>
        <p>{{ article.Article_summary }}</p>
        <p>{{ article.Article_category }}</p>
        <p class="font-italic">{{ article.Article_date }}</p>
        
    </div>
    <p> <button
            type="button"
            class="btn px-4 btn-success mx-3"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Comment
    </button></p>  

  </div>

  <!-- Modal For Adding Comment -->
  <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title p-2" id="exampleModalLabel">Add Comment</h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body px-5">
            <form class="" >
              <!-- @submit="sendData() -->
              <div class="pb-3">
  
                <div class="py-2">
                  <h6>Animal Date of Birth:</h6>
                  <input
                    id="dob"
                    v-model="comment_content"
                    class="border-0 outline-0 bg-light rounded-5 px-4 py-2 w-100"
                    placeholder="Date"
                    required
                    type="date"
                  />
                </div>
              </div>
              <div class="d-flex justify-content-end">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  class="btn btn-primary mx-2"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
          <div class="modal-footer"></div>
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
      title: "Article Page",
    };
  },
  data(){
    return{
    filter: null,
    comment_content: null,
  }},
  


});
</script>

<style scoped>
</style>
