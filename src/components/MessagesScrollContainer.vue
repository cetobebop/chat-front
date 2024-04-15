<template>
  <div
    ref="container"
    style="
      height: calc(50vh - 60px - 60px);
      max-width: 100%;
      min-width: 250px;
      overflow: auto;
      display: flex;
      flex-direction: column-reverse;
      scrollbar-gutter: stable both-edges;
      padding: 10px;
    "
    class="q-px-md"
  >
    <template v-for="(msg, i) in messagesList" :key="i">
      <messages-chat-bubble
        :content="msg.content"
        :sent="true"
        :first="true"
        v-if="isMyMessage(msg) && !previouMsgHasSameIdSender(msg, i)"
      ></messages-chat-bubble>

      <messages-chat-bubble
        :content="msg.content"
        :sent="true"
        :first="false"
        v-if="isMyMessage(msg) && previouMsgHasSameIdSender(msg, i)"
      ></messages-chat-bubble>

      <messages-chat-bubble
        :content="msg.content"
        :sent="false"
        :first="true"
        v-if="!isMyMessage(msg) && !previouMsgHasSameIdSender(msg, i)"
      ></messages-chat-bubble>

      <messages-chat-bubble
        :content="msg.content"
        :sent="false"
        :first="false"
        v-if="!isMyMessage(msg) && previouMsgHasSameIdSender(msg, i)"
      ></messages-chat-bubble>
    </template>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watchEffect } from "vue";

import { useMessageStore } from "src/stores/messages";
import { useUserStore } from "src/stores/user";
import MessagesChatBubble from "./MessagesChatBubble.vue";

const props = defineProps({
  chatId: String,
  containerInputHeight: String,
});

const container = ref(null);
const messageStore = useMessageStore();
const userStore = useUserStore();

const messagesList = computed(() => messageStore.getMessages(props.chatId));

function previouMsgHasSameIdSender(msgActual, i) {
  return (
    messageStore.getMessages(props.chatId)[i + 1]?.sender === msgActual.sender
  );
}

onMounted(() => {
  watchEffect(() => {
    container.value.style.height = `calc(100vh - 60px - ${props.containerInputHeight})`;
  });
});

const isMyMessage = (msg) => {
  return userStore.myUser._id === msg.sender;
};
</script>

<style scoped>
.q-message-text--sent {
  color: #005c4b !important;
  background: #005c4b !important;
}
</style>
