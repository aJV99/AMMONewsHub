<template>
    <div>
      <div class="bg-light m-2 p-2 px-5 rounded-pill d-flex flex-row justify-content-between align-self-center">
        <div>
        <div class="d-flex flex-row">
          <div class="text-start text-center align-self-center fw-bold mb-1">{{ node.user }}username </div>
          <!-- Current API fetches user_id not username, need to make small change to backend -->
          <div class="text-start text-center align-self-center fw-lighter mb-1 px-2">{{ node.updated}}</div>
        </div>
        <h6><div class="text-start text-start align-self-center fw-light mb-1">{{ node.text }}</div></h6>
        </div>
        <div class="d-flex flex-row">
          <button
            type="button"
            class="btn light-red align-self-center fw-lighter rounded-pill"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Reply
          </button>
          <div  type="button" class="btn align-self-center fw-lighter mx-1 rounded-pill grey" >Edit</div>
          <div type="button" class=" btn align-self-center fw-lighter  rounded-pill grey">Delete</div>
    </div>
  
    </div>
      <ul v-if="node.children && node.children.length">
        <li v-for="child in node.children" :key="child.id">
          <Comment :node="child" />
          
        </li>
      </ul>
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
  import { defineComponent } from "vue";
  export default defineComponent( {
    name: "Comment",
    props: {
      node: {
        type: Object,
        required: true
      }
    }
  });
  </script>