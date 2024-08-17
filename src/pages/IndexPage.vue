<template>
  <q-page class="row bg-dark text-white">
    <the-chat-contacts
      v-if="isUserView"
      class="col-xs-12 col-sm-4"
    ></the-chat-contacts>

    <messages-chat-unselected-chat
      class="col-xs-12 col-sm-8"
      v-if="!chatStore.chatSelect"
    ></messages-chat-unselected-chat>

    <the-chat-messages
      v-if="
        mobileNavigationStore.mobileViewHandler(`chats`) && chatStore.chatSelect
      "
      class="col-xs-12 col-sm-8"
    ></the-chat-messages>
    <q-resize-observer @resize="onResize" />
  </q-page>
</template>

<script setup>
import { ref, watchEffect } from "vue";

import TheChatContacts from "src/components/TheChatContacts.vue";
import TheChatMessages from "src/components/TheChatMessages.vue";
import MessagesChatUnselectedChat from "src/components/MessagesChatUnselectedChat.vue";

import { useChatStore } from "src/stores/chat";
import { useMobileNavigationStore } from "src/stores/mobileNavigation";

const chatStore = useChatStore();
const mobileNavigationStore = useMobileNavigationStore();
const isUserView = ref(true);
function onResize(size) {
  if (size.width <= 600) {
    isUserView.value = mobileNavigationStore.mobileViewHandler(`users`);
  }
}

watchEffect(() => {
  mobileNavigationStore.getSelectView();
  isUserView.value = mobileNavigationStore.mobileViewHandler(`users`);
});
</script>
