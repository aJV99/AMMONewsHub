<template>
  <div v-if="profile" class="mt-4">
    <h1>Profile</h1>
    <form @submit.prevent="updateProfile" class="form">
      <div class="form-group pb-4">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="profile.username" class="form-control" disabled />
      </div>
      <div class="form-group pb-4">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="profile.email" class="form-control" />
      </div>
      <div class="form-group pb-4">
        <label for="fullName">Full Name:</label>
        <input type="text" id="fullName" v-model="profile.full_name" class="form-control" />
      </div>
      <div class="form-group pb-4">
        <label for="profileImage">Profile Image:</label>
        <input type="file" id="profileImage" @change="uploadImage" class="form-control" /><br>
        <img :src="profile.image" alt="Profile Image" v-if="profile.image" class="profile-image" /><br>
        <button @click.prevent="resetImage" class="btn btn-secondary mt-2">Reset to Default</button>
      </div>
      <div class="form-group pb-4">
        <label for="bio">Bio:</label>
        <textarea id="bio" v-model="profile.bio" class="form-control"></textarea>
      </div>
      <div class="form-group pb-4">
        <label for="dob">Date of Birth:</label>
        <input type="date" id="dob" v-model="profile.date_of_birth" class="form-control" />
      </div>
      <div class="form-group pb-4">
        <label>Favorite Categories:</label>
        <div v-for="category in allCategories" :key="category.id" class="form-check">
          <input type="checkbox" 
                :id="'category' + category.id" 
                :value="category.name" 
                v-model="profile.favorite_categories" 
                class="form-check-input">
          <label :for="'category' + category.id" class="form-check-label">{{ category.name }}</label>
        </div>
      </div>
      <div class="form-group pb-4">
        <button type="submit" class="btn btn-primary">Save Changes</button>
        <span v-if="saveMessage" class="save-message">{{ saveMessage }}</span>
      </div>
    </form>
  </div>
  <div v-else>
    <p>Loading profile...</p>
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
  
          const saveMessage = ref('');

          const updateProfile = async () => {
            if (profile.value) {
              await userProfileStore.updateProfile(profile.value);
              saveMessage.value = 'Changes saved successfully!';
              setTimeout(() => { saveMessage.value = ''; }, 3000); // Clear message after 3 seconds
            }
          };

          const uploadImage = async (event: Event) => {
            const input = event.target as HTMLInputElement;
            if (!input.files?.length) {
              return;
            }
            const file = input.files[0] as File;  // File type is specified here
            await userProfileStore.uploadProfileImage(file);
          };

          const resetImage = async () => {
            await userProfileStore.resetProfileImageToDefault();
          };

        return {
            profile,
            updateProfile,
            uploadImage,
            resetImage,
            saveMessage,
        };
      },
      data() {
        return {
            // Replace this with your actual categories data source
            allCategories: [
                { id: 1, name: 'Sports' },
                { id: 2, name: 'World News' },
                { id: 3, name: 'Technology' },
                { id: 4, name: 'Health & Wellness' },
                { id: 5, name: 'Entertainment' },
            ]
        };
    },
  });
  </script>

<style>
.profile-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
}

.save-message {
  margin-left: 10px;
  color: green;
}
</style>