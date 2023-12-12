// stores/userProfile.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { Comment } from "../interfaces/Comments";

export const useCommentsStore = defineStore("comments", () => {
  const Comments = ref<Comment[] | null>(null);

  async function fetchComments(article_id: number) {
    Comments.value = [{ id: 3, text: "hello there", username: "orynamg" }];
    // try {
    //   const response = await fetch(`/comments/${article_id}`);
    //   if (response.ok) {
    //     const jsonResponse = await response.json();
    //     const data: Comment[] = jsonResponse.Comments;
    //     console.log("Fetched comments:", data);
    //     Comments.value = data;
    //   } else {
    //     // Handle errors
    //     console.error("Error fetching comments:", response.statusText);
    //   }
    // } catch (error) {
    //   // Handle errors
    //   console.error("Error fetching comments:", error);
    // }
  }

  return { Comments, fetchComments };
});
