<template>
  <div class="q-mt-md">
    <q-list
      style="max-width: calc(100% - 10px)"
      v-for="(user, index) in usersOnline"
      :key="index"
    >
      <q-separator inset="item" />
      <q-item
        clickable
        v-ripple
        class="q-py-md"
        :active="select === user._id"
        active-class="select"
        @click="selectAChat(user)"
      >
        <q-item-section avatar>
          <q-avatar>
            <img :src="user.userAvatar" />
            <q-badge floating rounded color="green"></q-badge>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{ user.username }}</q-item-label>
        </q-item-section>

        <q-item-section side top> 1 min ago </q-item-section>
      </q-item>
    </q-list>

    <q-separator inset="item" style="margin-right: 10px" />
  </div>
</template>

<script setup>
import { ref } from "vue";

import { useMessageStore } from "src/stores/messages";
import { useChatStore } from "src/stores/chat";
import { receiverHasChat } from "src/composables/receiverHasChat";
import { useMobileNavigationStore } from "src/stores/mobileNavigation";

const props = defineProps({
  usersOnline: Object,
});

const messagesStore = useMessageStore();
const chatStore = useChatStore();
const mobileNavigationStore = useMobileNavigationStore();

const select = ref("");

function selectAChat(user) {
  select.value = user._id;

  mobileNavigationStore.changeSelectView("chats");
  messagesStore.setReceiver(user._id);
  const receiverChat = receiverHasChat(user);
  if (receiverChat) {
    chatStore.setChatSelect(user, receiverChat);
    messagesStore.obtainMessages(receiverChat._id);
    return;
  }
  chatStore.setChatSelect(user);
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
</style>
