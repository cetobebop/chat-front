<template>
  <div class="q-mt-md" ref="divContainer">
    <q-list
      style="width: calc(100% - 10px)"
      v-for="chat in chatStore.myChats"
      :key="chat._id"
    >
      <q-separator inset="item" />

      <q-item
        clickable
        v-ripple
        class="q-py-md"
        @click="selectAChat(chat)"
        :active="select === chat._id"
        active-class="select"
      >
        <q-item-section avatar>
          <q-avatar>
            <img :src="chat.receiver.userAvatar" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{ chat.receiver.username }}</q-item-label>
          <q-item-label caption lines="1" class="text-white">
            <messages-message-status
              v-if="isMine(chat)"
              :status="lastMessageStatus(chat)"
            ></messages-message-status>
            <span v-if="!unreadMessagesCount(chat._id)" class="readMessages">
              {{ lastMessageContent(chat) }}</span
            >
            <span v-if="unreadMessagesCount(chat._id)" class="unreadMessages">
              {{ lastMessageContent(chat) }}</span
            >
          </q-item-label>
        </q-item-section>

        <q-item-section style="font-size: 0.9em" side top>
          <div
            v-if="unreadMessagesCount(chat._id)"
            class="text-teal text-weight-bold"
          >
            {{ lastMessageDate(chat) }}
          </div>
          <div v-if="!unreadMessagesCount(chat._id)">
            {{ lastMessageDate(chat) }}
          </div>

          <div v-if="unreadMessagesCount(chat._id)">
            <q-badge
              rounded
              text-color="dark"
              color="teal-6"
              :label="unreadMessagesCount(chat._id)"
            />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect, computed } from "vue";
import MessagesMessageStatus from "./MessagesMessageStatus.vue";

import { useChatStore } from "src/stores/chat";
import { useMessageStore } from "src/stores/messages";
import { useMobileNavigationStore } from "src/stores/mobileNavigation";
import { myMoment } from "src/boot/moment";
import { isMyMessage } from "src/composables/isMyMessage";
import { dateDifferenceFromNow } from "src/composables/dateDifferenceFromNow";
import { useUnreadMessagesStore } from "src/stores/unreadMessgesStore";

const props = defineProps({
  usersOnline: Object,
  maxWidth: Number,
});

const chatStore = useChatStore();
const messagesStore = useMessageStore();
const mobileNavigationStore = useMobileNavigationStore();
const unreadMessagesStore = useUnreadMessagesStore();

const divContainer = ref(null);
const select = ref("");

onMounted(() => {
  watchEffect(() => {
    divContainer.value.style.maxWidth = `calc(${props.maxWidth}px - 10px)`;
  });
});

function selectAChat(chat) {
  mobileNavigationStore.changeSelectView("chats");
  messagesStore.setReceiver(chat.receiver._id);
  chatStore.setChatSelect(chat.receiver, chat);
  messagesStore.obtainMessages(chat._id);
  select.value = chat._id;
  unreadMessagesStore.removeUnreadChats(chat._id);
}

const isMine = computed(() => {
  const cache = {};
  let lastValue;

  return function (chat) {
    const msg = messagesStore.getLastMessage(chat._id);

    if (msg._id === lastValue && msg._id) {
      return cache[chat._id];
    }

    const result = isMyMessage(msg);

    lastValue = msg._id;
    cache[chat._id] = result;
    return result;
  };
});

function lastMessageContent(chat) {
  return messagesStore.getLastMessage(chat._id).content;
}

const lastMessageDate = computed(() => {
  const cache = {};
  let lastValue;

  return function (chat) {
    const msg = messagesStore.getLastMessage(chat._id);
    if (msg._id === lastValue && msg._id) {
      return cache[chat._id];
    }

    const date = myMoment(msg.createdAt);
    let result;
    if (myMoment().diff(date, "day") < 1) {
      result = date.format("hh:mm A");
      result = result.replace("AM", "a.m.").replace("PM", "p.m.");
    } else {
      result = dateDifferenceFromNow(date);
    }
    cache[chat._id] = result;
    lastValue = msg._id;
    return result;
  };
});

const lastMessageStatus = computed(() => {
  const cache = {};

  return function (chat) {
    if (chat._id in cache) {
      return cache[chat._id];
    }

    const result = messagesStore.getLastMessage(chat._id).status;
    cache[chat.id] = result;
    return result;
  };
});

function unreadMessagesCount(chatId) {
  return unreadMessagesStore.getChatUnreadMessages(chatId);
}
</script>

<style scoped>
.q-separator {
  background: var(--border-contact);
}

.select {
  color: white;
  background: #333;
}

.readMessages {
  opacity: 0.6;
  font-weight: 300;
}

.unreadMessages {
  font-weight: 700;
}
</style>
