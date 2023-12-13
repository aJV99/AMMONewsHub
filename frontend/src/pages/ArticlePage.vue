<template>
  <div class="h1">
    {{ title }}
  </div>
  <p>{{article?.Article_title}}</p>
  <p>{{article?.Article_summary}}</p>
  <!-- <div v-if="article?.Comments !== null"></div> -->
    <div v-for="comment in comments" class="container border border-dark text-center mb-5 w-25">
        <!-- <p>{{comment}}</p> -->
        <Comment :node="comment" />


    </div>
    <p> <button
            type="button"
            class="btn px-4 btn-success mx-3"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Comment
    </button></p>  

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
                  <h6>Add Comment:</h6>
                  <input
                    id="comment_content"
                    v-model="comment_content"
                    class="border-0 outline-0 bg-light rounded-5 px-4 py-2 w-100"
                    placeholder="Text"
                    required
                    type="text"
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
import { mapActions } from 'pinia';
import { defineComponent, ref , unref} from 'vue';
// import { useArticleStore } from '../stores/articleStore';
import { useRoute } from 'vue-router';
import Comment from "./Comment.vue"



export default defineComponent({
  setup() {
    // const articleStore = useArticleStore();
    const route = useRoute();
    // const articleId = computed(() => {
    //   const id = route.params.id;
    //   return Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
    // });

    const article = ref({})
    const comments = ref({})

    fetch(`http://127.0.0.1:8000/articles/${route.params.id}`)
      .then(response => response.json())
      .then(data => article.value = data);

    fetch(`http://127.0.0.1:8000/articles/${route.params.id}/comments`)
      .then(response => response.json())
      .then(data => {
        const nodes = new Map();
        data.forEach((comment: any) => {
          if (nodes.has(comment.parent_comment_id)) {
            nodes.get(comment.parent_comment_id).push(comment)
          } else {
            nodes.set(comment.parent_comment_id, [comment])
          }
        });
        data.forEach((comment: any ) => {
          if (nodes.has(comment.id)) {
            comment.children = nodes.get(comment.id)
          }
        })
        console.log(data)
        comments.value = nodes.get(null)
      });
 

    return { article:article, title: "Article Page", comments:comments};
  },
  data(){
    return{
    filter: null,
    comment_content: null,
  }},
  components: {
    Comment,
  },
});
</script>

<style scoped>
</style>
