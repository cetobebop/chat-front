<template>
  <div id="chat-container-left">
    <base-toolbar
      :avatar="userStore?.myUser?.userAvatar"
      :title="userStore?.myUser?.username"
    ></base-toolbar>
    <contacts-users-scroll-container></contacts-users-scroll-container>
    <contacts-tab></contacts-tab>
  </div>
</template>

<script setup>
import BaseToolbar from "./BaseToolbar.vue";
import ContactsTab from "./ContactsTab.vue";
import ContactsUsersScrollContainer from "./ContactsUsersScrollContainer.vue";

import { useUserStore } from "src/stores/user";

const userStore = useUserStore();
</script>

<style scoped>
#chat-container-left {
  border-right: 1px solid var(--border-contact);
}

@media (max-width: 600px) {
  #chat-container-left {
    height: 100vh;
    font-size: 0.9em;
  }
}
</style>
