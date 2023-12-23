<template>
  <div class="h1 px-3">
    {{ article?.Article_title }}
  </div>
  <div class="bg-new p-2 m-2 mb-3 ">
    <p>{{ article?.Article_summary }}</p>
  </div>
  <h4>Comments</h4>

  <div>
    <div class="d-flex flex-row pb-4 pt-3 m-auto justify-content-center">
      <input class="comment outline-0 bg-light rounded-5 px-4 py-2" placeholder="Enter Comment" v-model="comment_content"
        required type="text" />
      <button @click="addComment(null)"
        class="btn align-self-center fw-lighter maroon rounded-pill px-4 py-3 mx-2">Post</button>
    </div>
  </div>

  <div v-for="comment in comments" class=" mx-auto bottom-comment">
    <CommentPage :node="comment" :deleteItem="deleteItem" :addComment="addComment" :editComment="editComment" />
  </div>
  <div class="mb-5"></div>
</template>

<script lang="ts">
// import { mapActions } from 'pinia';
import { defineComponent, ref, computed } from 'vue';
import { useArticleStore } from '../stores/articleStore';
import { useRoute } from 'vue-router';
import CommentPage from "./CommentPage.vue"
import { Comment } from "../interfaces/Comments"

export default defineComponent({
  setup() {
    const articleStore = useArticleStore();
    const route = useRoute();
    const articleId = computed(() => {
      const id = route.params.id;
      return Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
    });

    const article = ref(articleStore.getArticleById(articleId.value))
    const comments = ref<Comment[]>([])
    const allComments = ref(new Map())

    articleStore.fetchArticleComments(articleId.value)
      .then(() => {
        const data = articleStore.Comments.get(articleId.value)
        const nodes = new Map();
        data?.forEach((comment: any) => {
          if (nodes.has(comment.parent_comment_id)) {
            nodes.get(comment.parent_comment_id).push(comment)
          } else {
            nodes.set(comment.parent_comment_id, [comment])
          }
          allComments.value.set(comment.id, comment)
        });
        data?.forEach((comment: any) => {
          if (nodes.has(comment.id)) {
            comment.children = nodes.get(comment.id)
          } else {
            comment.children = []
          }
        })
        comments.value = nodes.get(null)
      });

    async function deleteItem(node: any) {
      console.log("deleteItem() " + JSON.stringify(node))
      await articleStore.deleteComment(node)
      if (node.parent_comment_id != null) {
        const parentComment = allComments.value.get(node.parent_comment_id)
        parentComment.children = parentComment.children.filter((comment: any) => comment.id != node.id)
      } else {
        comments.value = comments.value.filter((comment: any) => comment.id != node.id);
      }
      allComments.value.delete(node.id)
    }

    async function addComment(node: any) {
      // @ts-ignore
      const comment = await articleStore.addComment(this.comment_content, articleId.value, node?.id)

      console.log(comment)
      console.log(JSON.stringify(comment))
      if (comment.parent_comment_id != null) {
        console.log("great")
        const parentComment = allComments.value.get(comment.parent_comment_id)
        parentComment.children.push(comment)
      } else {
        comments.value.push(comment)
      }
      allComments.value.set(comment.id, comment)
      comment.children = []
    }

    async function editComment(node: any) {
      console.log("editComment ", node)
      // @ts-ignore
      const comment = await articleStore.editComment(this.comment_content, articleId.value, node?.id)

    }

    return { article: article, title: "Article Page", comments: comments, deleteItem, addComment, editComment };
  },
  data() {
    return {
      comment_content: null
    }
  },
  components: {
    CommentPage,
  },
  methods: {

  }
});
</script>

<style scoped></style>
