<template>
  <div class="h1 px-3">
    {{ article?.Article_title }}
  </div>
  <div class="bg-new p-2 m-2 mb-3 ">
    <p>{{ article?.Article_summary }} Great Britain's most successful female Olympian Dame Laura Kenny believes women
      athletes can struggle to get pregnant because of their lifestyle.

      Kenny, 31, won five gold medals and one silver across three Olympic Games at London 2012, Rio 2016 and Tokyo 2020.

      The mum-of-two is targeting a fourth Games in Paris next year.

      Kenny says she has had "many conversations" with athletes suffering with Relative Energy Deficiency in Sport.

      Known as Red-S, the condition occurs when athletes expend more energy in training than they consume through food and
      drink and one of the key symptoms in women is the absence of periods.

      5 Live Sport podcast: All About - The Laura and Jason Kenny one
      Several sportswomen have spoken about their experience with Red-S, including athletes Anna Boniface, Bobby Clay and
      Pippa Woolven and mountain bike racer Evie Richards.

      "There are females that have struggled and will struggle to get pregnant because of the lifestyle of being an
      athlete," Kenny, who does not have the condition, told BBC Radio 5 Live Breakfast.

      "We've all heard of Red-S - being females losing their periods. You're not going to be able to fall pregnant if you
      haven't got a period.

      "It's actually a really unhealthy lifestyle that these females can't have kids and it's actually really sad.

      "I've always consistently had a period but the amount of conversations I've heard of people having Red-S.

      "Red-S is actually really dangerous... these people are giving up lots of things that really deep down they want."
    </p>
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
    <Comment :node="comment" :deleteItem="deleteItem" :addComment="addComment" />
  </div>
  <div class="mb-5"></div>
</template>

<script lang="ts">
// import { mapActions } from 'pinia';
import { defineComponent, ref, computed } from 'vue';
import { useArticleStore } from '../stores/articleStore';
import { useRoute } from 'vue-router';
import Comment from "./Comment.vue"

export default defineComponent({
  setup() {
    const articleStore = useArticleStore();
    const route = useRoute();
    // const articleId = ref(route.params.id)
    const articleId = computed(() => {
      const id = route.params.id;
      return Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
    });

    const article = ref(articleStore.getArticleById(articleId.value))
    const comments = ref([])
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

    return { article: article, title: "Article Page", comments: comments, deleteItem, addComment };
  },
  data() {
    return {
      comment_content: null
    }
  },
  components: {
    Comment,
  },
  methods: {

  }
});
</script>

<style scoped></style>
