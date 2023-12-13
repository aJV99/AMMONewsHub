<template>
    <button type="button" class="btn light-red align-self-center fw-lighter rounded-pill" data-bs-toggle="modal"
        :data-bs-target="'#replyId-' + node.id">
        Reply
    </button>
    <!-- Modal For Adding Comment -->
    <div class="modal fade" :id="`replyId-${node.id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title p-2 fw-light" id="exampleModalLabel">Add Reply</h4>
                    <div>{{ node.text }}</div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body px-5">
                    <div class="">

                        <div class="pb-3">

                            <div class="py-2">
                                <input id="comment_content" v-model="comment_content"
                                    class="comment outline-0 bg-light rounded-5 px-4 py-2 w-100 short"
                                    placeholder="Your reply here..." required type="text" />
                            </div>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn align-self-center fw-lighter mx-1 rounded-pill grey"
                                data-bs-dismiss="modal">
                                Close
                            </button>
                            <button @click="addComment(node)"
                                class="btn align-self-center fw-lighter mx-1 rounded-pill light-red">
                                Reply
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
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
    name: "Reply",
    props: {
        node: {
            type: Object,
            required: true
        },
        addComment: {
            type: Function,
            required: true
        }
    },

});
</script>      