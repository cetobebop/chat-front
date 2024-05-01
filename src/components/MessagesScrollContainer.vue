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
    <template
      v-for="(msg, i) in messageStore.getMessages(props.chatId)"
      :key="msg._id"
    >
      <messages-chat-bubble
        :content="msg.content"
        :sent="true"
        :first="true"
        v-if="isMyMessage(msg) && !previouMsgHasSameIdSender(msg, i)"
        :status="msg.status"
        :date="msg.createdAt"
      ></messages-chat-bubble>

      <messages-chat-bubble
        :content="msg.content"
        :sent="true"
        :first="false"
        v-if="isMyMessage(msg) && previouMsgHasSameIdSender(msg, i)"
        :status="msg.status"
        :date="msg.createdAt"
      ></messages-chat-bubble>

      <messages-chat-bubble
        :content="msg.content"
        :sent="false"
        :first="true"
        v-if="!isMyMessage(msg) && !previouMsgHasSameIdSender(msg, i)"
        :date="msg.createdAt"
      ></messages-chat-bubble>

      <messages-chat-bubble
        :content="msg.content"
        :sent="false"
        :first="false"
        v-if="!isMyMessage(msg) && previouMsgHasSameIdSender(msg, i)"
        :date="msg.createdAt"
      ></messages-chat-bubble>

      <messages-date-stamp
        v-if="isTheSameDate(msg.createdAt, i)"
        :id="msg._id"
        :i="i"
        :date="msg.createdAt"
      ></messages-date-stamp>
    </template>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watchEffect } from "vue";

import { useMessageStore } from "src/stores/messages";
import MessagesChatBubble from "./MessagesChatBubble.vue";
import { isMyMessage } from "src/composables/isMyMessage";
import MessagesDateStamp from "./MessagesDateStamp.vue";
import { dateDifferenceFromNow } from "src/composables/dateDifferenceFromNow";

const props = defineProps({
  chatId: String,
  containerInputHeight: String,
});

let dateBuffer;
const container = ref(null);
const messageStore = useMessageStore();

const messagesList = computed(() => {
  return messageStore.getMessages(props.chatId);
});

function previouMsgHasSameIdSender(msgActual, i) {
  const result =
    messageStore.getMessages(props.chatId)[i + 1]?.sender === msgActual.sender;

  return result;
}

function isTheSameDate(date, i) {
  const proxDate = messageStore.getMessages(props.chatId)[i + 1]?.createdAt;

  let result;
  const proxDateFormat = dateDifferenceFromNow(proxDate);

  if (!i) {
    dateBuffer = dateDifferenceFromNow(date);
  }

  if (!proxDate) {
    result = true;
  } else if (proxDateFormat !== dateBuffer) {
    result = true;
    dateBuffer = proxDateFormat;
  } else result = false;

  return result;
}

watchEffect(() => {
  if (messagesList.value) {
    messagesList.value.length;
    messageStore.readMessages(props.chatId);
  }
});

onMounted(() => {
  watchEffect(() => {
    container.value.style.height = `calc(100vh - 60px - ${props.containerInputHeight})`;
  });
});
</script>

<style scoped>
.q-message-text--sent {
  color: #005c4b !important;
  background: #005c4b !important;
}
</style>
