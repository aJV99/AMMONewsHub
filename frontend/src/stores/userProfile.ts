// stores/userProfile.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { Profile } from "../interfaces/Profile";

function getCsrfToken() {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, "csrftoken".length + 1) === ("csrftoken" + '=')) {
        cookieValue = decodeURIComponent(cookie.substring("csrftoken".length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export const useUserProfileStore = defineStore("userProfile", () => {
  const profile = ref<Profile | null>(null);

  async function fetchUserProfile() {
    try {
      const response = await fetch("/profile/");
      if (response.ok) {
        const data: Profile = await response.json();
        profile.value = data;
      } else {
        // Handle errors
      }
    } catch (error) {
      // Handle errors
    }
  }

  async function updateProfile(updatedProfile: Profile) {
    const csrfToken = getCsrfToken(); 
    if (!csrfToken) {
      console.error('CSRF token not found');
      return;
  }
    try {
        const response = await fetch(`/profile/update/`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrfToken // Include the CSRF token in the request headers
          },
          body: JSON.stringify(updatedProfile),
          credentials: 'include'
        });
        if (response.ok) {
          profile.value = { ...profile.value, ...updatedProfile };
        }
    } catch (error) {
        // Handle errors
    }

    
}

  return { profile, fetchUserProfile, updateProfile };
});
