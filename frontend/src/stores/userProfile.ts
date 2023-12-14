// stores/userProfile.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { Profile } from "../interfaces/Profile";
import { inject } from "vue";

function getCsrfToken() {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, "csrftoken".length + 1) === "csrftoken" + "=") {
        cookieValue = decodeURIComponent(
          cookie.substring("csrftoken".length + 1)
        );
        break;
      }
    }
  }
  return cookieValue;
}

export const useUserProfileStore = defineStore("userProfile", () => {
  const profile = ref<Profile | null>(null);
  const backedUrl = inject("backend_url");

  async function fetchUserProfile() {
    try {
      const response = await fetch(`${backedUrl}/profile/`);
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
      console.error("CSRF token not found");
      return;
    }
    try {
      const response = await fetch(`${backedUrl}/profile/update/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken, // Include the CSRF token in the request headers
        },
        body: JSON.stringify(updatedProfile),
        credentials: "include",
      });
      if (response.ok) {
        profile.value = { ...profile.value, ...updatedProfile };
      }
    } catch (error) {
      // Handle errors
    }
  }

  async function uploadProfileImage(file: File) {
    if (!file) {
      console.error("No file provided");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    const csrfToken = getCsrfToken();
    if (!csrfToken) {
      console.error("CSRF token not found");
      return;
    }
    try {
      const response = await fetch(`${backedUrl}/profile/upload-image/`, {
        method: "POST",
        body: formData,
        headers: {
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        if (profile.value) {
          profile.value.image = data.image_url; // Update the profile image URL in the store
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  async function resetProfileImageToDefault() {
    const csrfToken = getCsrfToken();
    if (!csrfToken) {
      console.error("CSRF token not found");
      return;
    }
    try {
      const response = await fetch(`${backedUrl}/profile/reset-image/`, {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        if (profile.value) {
          profile.value.image = data.image_url; // Update the profile image URL in the store
        }
      }
    } catch (error) {
      console.error("Error resetting image:", error);
    }
  }

  return {
    profile,
    fetchUserProfile,
    updateProfile,
    uploadProfileImage,
    resetProfileImageToDefault,
  };
});
