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
                const jsonResponse = await response.json();
                const data: Article[] = jsonResponse.Articles;
                console.log('Fetched Articles:', data)
                Articles.value = data;
            } else {
                // Handle errors
                console.error('Error fetching articles:', response.statusText);
            }
        } catch (error) {
            // Handle errors
            console.error('Error in fetchArticles:', error);
        }
    }

    return { Articles, fetchArticles };
});
