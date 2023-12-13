<template>
    <div>
      <div class="text-start">{{ node.text }}</div>
      <ul v-if="node.children && node.children.length">
        <li v-for="child in node.children" :key="child.id">
          <Comment :node="child" />
        </li>
      </ul>
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