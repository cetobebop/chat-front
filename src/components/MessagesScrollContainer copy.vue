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
    "
    class="q-px-md"
  >
    <template v-for="(msg, i) in messagesList" :key="i">
      <q-chat-message
        bg-color="teal-10"
        text-color="white"
        v-if="isMyMessage(msg)"
        sent
      >
        <div>{{ msg.content }}</div>
      </q-chat-message>
      <q-chat-message
        v-if="!isMyMessage(msg)"
        bg-color="blue-grey-10"
        text-color="white"
        :text="[msg.content]"
      />
    </template>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watchEffect } from "vue";

import { useMessageStore } from "src/stores/messages";
import { useUserStore } from "src/stores/user";

const props = defineProps({
  chatId: String,
  containerInputHeight: String,
});

const container = ref(null);
const messageStore = useMessageStore();
const userStore = useUserStore();

const messagesList = computed(() => messageStore.getMessages(props.chatId));

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
