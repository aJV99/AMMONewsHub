<template>
  <div>
    <div class="bg-light m-2 p-2 px-5 rounded-pill d-flex flex-row justify-content-between align-self-center">
      <div>
        <div class="d-flex flex-row">
          <div class="text-start text-center align-self-center fw-bold mb-1">{{ node.user_name }}</div>
          <!-- Current API fetches user_id not username, need to make small change to backend -->
          <div class="text-start text-center align-self-center fw-lighter mb-1 px-2">{{ node.updated }}</div>
        </div>
        <h6>
          <div class="text-start text-start align-self-center fw-light mb-1">{{ node.text }}</div>
        </h6>
      </div>
      <div class="d-flex flex-row">
        <div v-if="node.user_id === userId" class="d-flex flex-row">
          <div class="align-self-center">
            <Reply :node="node" :addComment="editComment" :isEdit="true" />
          </div>
          <div type="button" @click="deleteItem(node)" class="mx-1 btn align-self-center fw-lighter  rounded-pill grey">
            Delete</div>
        </div>

        <div class="align-self-center">
          <Reply :node="node" :addComment="addComment" :isEdit="false" />
        </div>

      </div>

    </div>
    <ul v-if="node.children && node.children.length">
      <li v-for="child in node.children" :key="child.id">
        <CommentPage :node="child" :deleteItem="deleteItem" :addComment="addComment" :editComment="editComment" />
      </li>
    </ul>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from "vue";
import Reply from "./Reply.vue"
import { useUserProfileStore } from '../stores/userProfile';
export default defineComponent({
  setup() {
    const userProfileStore = useUserProfileStore();

    const userId = ref(-1)
    userProfileStore.fetchUserProfile().then(() => userId.value = userProfileStore.profile?.user_id ?? -1);

    return { userId }

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
    },
    editComment: {
      type: Function,
      required: true
    }
  },

});
</script>