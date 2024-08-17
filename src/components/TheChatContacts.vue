<template>
  <div id="chat-container-left">
    <base-toolbar
      :avatar="userStore?.myUser?.userAvatar"
      title="App de mensajeria"
    ></base-toolbar>
    <contacts-users-scroll-container
      :maxWidth="maxWidth"
    ></contacts-users-scroll-container>
    <contacts-tab :maxWidth="maxWidth"></contacts-tab>
    <q-resize-observer @resize="onResize" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseToolbar from "./BaseToolbar.vue";
import ContactsTab from "./ContactsTab.vue";
import ContactsUsersScrollContainer from "./ContactsUsersScrollContainer.vue";

import { useElmentsSizeStore } from "src/stores/elementsSize";
import { useUserStore } from "src/stores/user";

  
const elmentsSizeStore = useElmentsSizeStore()
const userStore = useUserStore();

const maxWidth = ref(null);

function onResize(size) {
  elmentsSizeStore.theChatContactsSize = size
  maxWidth.value = size.width;
}
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
