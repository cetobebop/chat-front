<template>
  <div id="chat-container-right">
    <base-toolbar
      :arrowBack="true"
      :avatar="urlAvatar"
      :title="username"
      style="position: fixed; top: 0; z-index: 100; width: 100%"
    ></base-toolbar>

    <messages-scroll-container
      :containerInputHeight="containerInputHeight"
      :chatId="chatId"
    ></messages-scroll-container>

    <messages-input-message
      @container-input-height="setNewHeight"
      :chatId="chatId"
    ></messages-input-message>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import BaseToolbar from "./BaseToolbar.vue";
import MessagesInputMessage from "./MessagesInputMessage.vue";
import MessagesScrollContainer from "./MessagesScrollContainer.vue";

import { useChatStore } from "src/stores/chat";

const containerInputHeight = ref("60px");

function setNewHeight(height) {
  containerInputHeight.value = height + "px";
}

const chatStore = useChatStore();
const username = computed(() => {
  return chatStore?.chatSelect?.user?.username;
});

const chatId = computed(() => {
  return chatStore?.chatSelect?.chat?._id;
});

const urlAvatar = computed(() => {
  return chatStore?.chatSelect?.user?.userAvatar;
});
</script>

<style scoped>
@media (max-width: 600px) {
  #chat-container-right {
    height: 100vh;
    font-size: 0.9em;
  }
}
</style>
