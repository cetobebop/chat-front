<template>
  <div
    ref="container"
    id="div"
    style="
      height: calc(100vh - 60px - 60px);
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
    <q-chat-message
      v-if="chatStore.getWritingBand(chatId)"
      bg-color="blue-grey-9"
      style="margin: 10px 0 5px 20px"
    >
      <q-spinner-dots size="2rem" />
    </q-chat-message>

    <messages-notification-without-chat
      v-if="!messageStore.getLastMessage(props.chatId)"
    >
    </messages-notification-without-chat>

    <template
      v-for="(msg, i) in messageStore.getMessages(props.chatId)"
      :key="msg._id"
    >
      <messages-chat-bubble
        :content="msg.content"
        :sent="true"
        :first="true"
        v-if="
          isMyMessage(msg) &&
          !previouMsgHasSameIdSender(msg, i) &&
          !msg.isAMultimediaFile
        "
        :status="msg.status"
        :date="msg.createdAt"
      ></messages-chat-bubble>

      <messages-chat-bubble
        :content="msg.content"
        :sent="true"
        :first="false"
        v-if="
          isMyMessage(msg) &&
          previouMsgHasSameIdSender(msg, i) &&
          !msg.isAMultimediaFile
        "
        :status="msg.status"
        :date="msg.createdAt"
      ></messages-chat-bubble>

      <messages-chat-bubble
        :content="msg.content"
        :sent="false"
        :first="true"
        v-if="
          !isMyMessage(msg) &&
          !previouMsgHasSameIdSender(msg, i) &&
          !msg.isAMultimediaFile
        "
        :date="msg.createdAt"
      ></messages-chat-bubble>

      <messages-chat-bubble
        :content="msg.content"
        :sent="false"
        :first="false"
        v-if="
          !isMyMessage(msg) &&
          previouMsgHasSameIdSender(msg, i) &&
          !msg.isAMultimediaFile
        "
        :date="msg.createdAt"
      ></messages-chat-bubble>

      <messages-chat-bubble-image
        :url-image="msg.content"
        :sent="true"
        :first="true"
        v-if="
          isMyMessage(msg) &&
          !previouMsgHasSameIdSender(msg, i) &&
          msg.isAMultimediaFile
        "
        :date="msg.createdAt"
        :status="msg.status"
      >
      </messages-chat-bubble-image>

      <messages-chat-bubble-image
        :url-image="msg.content"
        :sent="true"
        :first="false"
        v-if="
          isMyMessage(msg) &&
          previouMsgHasSameIdSender(msg, i) &&
          msg.isAMultimediaFile
        "
        :date="msg.createdAt"
        :status="msg.status"
      >
      </messages-chat-bubble-image>

      <messages-chat-bubble-image
        :url-image="msg.content"
        :sent="false"
        :first="true"
        v-if="
          !isMyMessage(msg) &&
          !previouMsgHasSameIdSender(msg, i) &&
          msg.isAMultimediaFile
        "
        :date="msg.createdAt"
      >
      </messages-chat-bubble-image>

      <messages-chat-bubble-image
        :url-image="msg.content"
        :sent="false"
        :first="false"
        v-if="
          !isMyMessage(msg) &&
          previouMsgHasSameIdSender(msg, i) &&
          msg.isAMultimediaFile
        "
        :date="msg.createdAt"
      >
      </messages-chat-bubble-image>

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

import MessagesChatBubble from "./MessagesChatBubble.vue";
import MessagesChatBubbleImage from "./MessagesChatBubbleImage.vue";
import MessagesDateStamp from "./MessagesDateStamp.vue";
import MessagesNotificationWithoutChat from "./MessagesNotificationWithoutChat.vue";

import { useMessageStore } from "src/stores/messages";
import { isMyMessage } from "src/composables/isMyMessage";
import { dateDifferenceFromNow } from "src/composables/dateDifferenceFromNow";
import { useUnreadMessagesStore } from "src/stores/unreadMessgesStore";
import { useChatStore } from "src/stores/chat";
import { scrollToTheBottom } from "src/composables/scrollToTheBottom";

const props = defineProps({
  chatId: String,
  containerInputHeight: String,
});

let dateBuffer;
const container = ref(null);
const messageStore = useMessageStore();
const unreadMessagesStore = useUnreadMessagesStore();
const chatStore = useChatStore();

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
    unreadMessagesStore.removeUnreadChats(props.chatId);
  }
});

onMounted(() => {
  watchEffect(() => {
    props.chatId;
    scrollToTheBottom(container.value);
  });

  watchEffect(() => {
    container.value.style.height = `calc(100vh - 60px - ${props.containerInputHeight})`;
  });
});
</script>

<style scoped>
#div {
  background: var(--container-background);
  object-fit: cover;
}

.q-message-text--sent {
  color: #005c4b !important;
  background: #005c4b !important;
}
</style>
