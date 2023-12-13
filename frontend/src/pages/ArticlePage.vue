<template>
  <div class="h1 px-3">
    {{article?.Article_title}}
  </div>
  <div class="bg-new p-2 m-2 mb-3 ">
  <p>{{article?.Article_summary}} Great Britain's most successful female Olympian Dame Laura Kenny believes women athletes can struggle to get pregnant because of their lifestyle.

Kenny, 31, won five gold medals and one silver across three Olympic Games at London 2012, Rio 2016 and Tokyo 2020.

The mum-of-two is targeting a fourth Games in Paris next year.

Kenny says she has had "many conversations" with athletes suffering with Relative Energy Deficiency in Sport.

Known as Red-S, the condition occurs when athletes expend more energy in training than they consume through food and drink and one of the key symptoms in women is the absence of periods.

5 Live Sport podcast: All About - The Laura and Jason Kenny one
Several sportswomen have spoken about their experience with Red-S, including athletes Anna Boniface, Bobby Clay and Pippa Woolven and mountain bike racer Evie Richards.

"There are females that have struggled and will struggle to get pregnant because of the lifestyle of being an athlete," Kenny, who does not have the condition, told BBC Radio 5 Live Breakfast.

"We've all heard of Red-S - being females losing their periods. You're not going to be able to fall pregnant if you haven't got a period.

"It's actually a really unhealthy lifestyle that these females can't have kids and it's actually really sad.

"I've always consistently had a period but the amount of conversations I've heard of people having Red-S.

"Red-S is actually really dangerous... these people are giving up lots of things that really deep down they want."
  </p>
</div>
<h4>Comments</h4>

<div>
  <form action="" class="d-flex flex-row pb-4 pt-3 m-auto justify-content-center">
    <input
        class="comment outline-0 bg-light rounded-5 px-4 py-2"
        placeholder="Enter Comment"
        required
        type="text"
      />
      <div class="btn align-self-center fw-lighter maroon rounded-pill px-4 py-3 mx-2">Post</div>
  </form>
</div>

    <div v-for="comment in comments" class=" mx-auto bottom-comment">
        <Comment :node="comment" />
  
    </div>
   <div class="mb-5"></div>
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
