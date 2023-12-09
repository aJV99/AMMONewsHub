// stores/userProfile.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Article } from '../interfaces/Articles';

export const useArticleStore = defineStore('articles', () => {
    const Articles = ref<Article[] | null>(null);

    async function fetchArticles() {
        try {
            const response = await fetch('/articles/');
            if (response.ok) {
                const data: Article[] = await response.json();
                console.log('Fetched Articles:', data)
                Articles.value = data;
            } else {
                // Handle errors
            }
        } catch (error) {
            // Handle errors
        }
    }

    return { Articles, fetchArticles };
});
