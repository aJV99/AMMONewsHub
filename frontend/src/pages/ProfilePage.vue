<!-- ProfilePage.vue -->
<template>
    <div v-if="profile">
      <h1>Profile</h1>
      <p>Username: {{ profile.username }}</p>
      <p>Email: {{ profile.email }}</p>
      <p>Full Name: {{ profile.full_name }}</p>
      <p>Bio: {{ profile.bio }}</p>
      <img :src="profile.image" v-if="profile.image" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref, watch } from 'vue';
  import { useUserProfileStore } from '../stores/userProfile';
  
  export default defineComponent({
      setup() {
          const userProfileStore = useUserProfileStore();
          const profile = ref(userProfileStore.profile);
  
          onMounted(async () => {
              if (!userProfileStore.profile) {
                  await userProfileStore.fetchUserProfile();
              }
          });
  
          watch(() => userProfileStore.profile, (newProfile) => {
              profile.value = newProfile;
          });
  
          return {
              profile
          };
      }
  });
  </script>
  