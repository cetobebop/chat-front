<template>
  <div class="q-mt-md">
    <q-list
      style="max-width: calc(100% - 10px)"
      v-for="(chat, i) in chatStore.myChats"
      :key="i"
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
          <q-item-label caption lines="2" class="text-white">
            {{ lastMessage(chat) }}
          </q-item-label>
        </q-item-section>

        <q-item-section side top> 1 min ago </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useChatStore } from "src/stores/chat";
import { useMessageStore } from "src/stores/messages";
import { useMobileNavigationStore } from "src/stores/mobileNavigation";

defineProps({
  usersOnline: Object,
});

const chatStore = useChatStore();
const messagesStore = useMessageStore();
const mobileNavigationStore = useMobileNavigationStore();

const select = ref("");

function selectAChat(chat) {
  mobileNavigationStore.changeSelectView("chats");
  messagesStore.setReceiver(chat.receiver._id);
  chatStore.setChatSelect(chat.receiver, chat);
  messagesStore.obtainMessages(chat._id);
  select.value = chat._id;
}

const lastMessage = (chat) => {
  return messagesStore.getLastMessage(chat._id) || chat?.msg[0]?.content;
};
</script>

<style scoped>
.q-separator {
  background: var(--border-contact);
}

.select {
  color: white;
  background: #333;
}
</style>
