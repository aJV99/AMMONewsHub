<template>
    <nav class="navbar navbar-expand-lg" style="background-color: darkred;">
      <div class="container">
        <a class="navbar-brand nav-link text-white font-weight-bold" href="#">AMMO News Hub</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link text-white font-weight-bold" :to="{name: 'Main Page'}">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white font-weight-bold" :to="{name: 'Other Page'}">Other Page</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white font-weight-bold" :to="{name: 'Profile Page'}">Profile</router-link>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <button v-if="isAuthenticated" class="btn btn-outline-light" @click="logout">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <main class="container pt-4">
      <RouterView class="flex-shrink-0" />
    </main>
  </template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";

export default defineComponent({
    components: { RouterView },
    data() {
        return {
            isAuthenticated: true // This should ideally be dynamic based on actual authentication status
        };
    },
    methods: {
        async logout() {
            const csrfToken = this.getCookie('csrftoken');
            if (!csrfToken) {
                console.error('CSRF token not found');
                return;
            }

            try {
                const response = await fetch('/logout/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken
                    },
                    credentials: 'include'
                });
                const data = await response.json();
                if (data.success) {
                    // Redirect to the server-side login URL
                    window.location.href = '/login/';
                }
            } catch (error) {
                console.error('Logout failed:', error);
            }
        },

        getCookie(name: string | any[]) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    }
});
</script>

<style scoped>
.nav-link {
  color: white !important; /* Overriding default color */
  font-weight: bold !important;
}
</style>