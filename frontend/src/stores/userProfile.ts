// stores/userProfile.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { Profile } from "../interfaces/Profile";

export const useUserProfileStore = defineStore("userProfile", () => {
  const profile = ref<Profile | null>(null);

  async function fetchUserProfile() {
    try {
      const response = await fetch("http://localhost:8000/profile/");
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

  return { profile, fetchUserProfile };
});
