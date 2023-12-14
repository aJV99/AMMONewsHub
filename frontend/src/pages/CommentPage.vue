<template>
  <div>
    <div class="bg-light m-2 p-2 px-5 rounded-pill d-flex flex-row justify-content-between align-self-center">
      <div>
        <div class="d-flex flex-row">
          <div class="text-start text-center align-self-center fw-bold mb-1">{{ node.user }}username </div>
          <!-- Current API fetches user_id not username, need to make small change to backend -->
          <div class="text-start text-center align-self-center fw-lighter mb-1 px-2">{{ node.updated }}</div>
        </div>
        <h6>
          <div class="text-start text-start align-self-center fw-light mb-1">{{ node.text }}</div>
        </h6>
      </div>
      <div class="d-flex flex-row">
        <div type="button" class="btn align-self-center fw-lighter rounded-pill grey">Edit</div>
        <div type="button" @click="deleteItem(node)" class="mx-1 btn align-self-center fw-lighter  rounded-pill grey">
          Delete</div>
        <div class="align-self-center">
          <Reply :node="node" :addComment="addComment" />
        </div>

      </div>

    </div>
    <ul v-if="node.children && node.children.length">
      <li v-for="child in node.children" :key="child.id">
        <CommentPage :node="child" :deleteItem="deleteItem" :addComment="addComment" />
      </li>
    </ul>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import Reply from "./Reply.vue"
export default defineComponent({
  setup() {

  },
  mounted() {
  },
  data() {
    return {
      comment_content: null
    }
  },
  methods: {
  },
  components: {
    Reply
  },
  name: "CommentPage",
  props: {
    node: {
      type: Object,
      required: true
    },
    deleteItem: {
      type: Function,
      required: true
    },
    addComment: {
      type: Function,
      required: true
    }
  },

});
</script>