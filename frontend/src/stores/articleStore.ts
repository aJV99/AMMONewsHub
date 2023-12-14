// stores/userProfile.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { Article } from "../interfaces/Articles";
import { Comment } from "../interfaces/Comments";
import { inject } from "vue";

export const useArticleStore = defineStore("articles", () => {
  const Articles = ref<Article[] | null>(null);
  const Comments = ref<Map<number, Comment[]>>(new Map());

  const backedUrl = inject("backend_url");

  async function fetchArticles() {
    try {
      const response = await fetch(`${backedUrl}/articles/`, {
        credentials: "include",
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        const data: Article[] = jsonResponse.Articles;
        console.log("Fetched Articles:", data);
        Articles.value = data;
      } else {
        // Handle errors
        console.error("Error fetching articles:", response.statusText);
      }
    } catch (error) {
      // Handle errors
      console.error("Error in fetchArticles:", error);
    }
  }

  async function fetchArticleComments(article_id: number) {
    try {
      const response = await fetch(
        `${backedUrl}/articles/${article_id}/comments`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data: Comment[] = await response.json();
        console.log("Fetched Comments:", data);
        Comments.value.set(article_id, data);
      } else {
        // Handle errors
        console.error("Error fetching comments:", response.statusText);
      }
    } catch (error) {
      // Handle errors
      console.error("Error fetching comments:", error);
    }
  }

  function getArticleById(article_id: number) {
    console.log("****" + Articles.value);
    return Articles.value?.find((article) => article_id === article.id);
  }

  async function deleteComment(comment: Comment) {
    console.log("deleteComment() " + JSON.stringify(comment));
    const url = `${backedUrl}/articles/${comment.article_id}/comments/${comment.id}`;
    await fetch(url, {
      method: "DELETE",
    });
    Comments.value.set(
      comment.article_id,
      Comments.value
        .get(comment.article_id)
        ?.filter((c) => c.id === comment.id) || []
    );
  }

  async function addComment(
    text: string,
    article_id: number,
    parent_id: number | null
  ) {
    let data = {
      text: text,
    };
    let response_url = `${backedUrl}/articles/${article_id}/comments`;
    if (parent_id != null) {
      response_url += `/${parent_id}`;
    }

    const response = await fetch(response_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const comment = await response.json();

    if (Comments.value.has(article_id)) {
      Comments.value.get(article_id)?.push(comment);
    } else {
      Comments.value.set(article_id, [comment]);
    }

    return comment;
  }

  async function editComment(
    text: string,
    article_id: number,
    comment_id: number
  ) {
    let data = {
      text: text,
    };
    let response_url = `${backedUrl}/articles/${article_id}/comments/${comment_id}`;

    const response = await fetch(response_url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const comment = await response.json();
    // @ts-ignore
    const old_comment = Comments.value
      .get(article_id)
      ?.find((c) => c.id === comment_id);

    if (old_comment != null) {
      old_comment.text = text;
    }

    return comment;
  }

  return {
    Articles,
    Comments,
    fetchArticles,
    getArticleById,
    fetchArticleComments,
    deleteComment,
    addComment,
    editComment,
  };
});
