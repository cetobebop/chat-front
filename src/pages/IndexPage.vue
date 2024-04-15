<template>
  <q-page class="row bg-dark text-white">
    <the-chat-contacts
      v-if="mobileNavigationStore.mobileViewHandler(`users`)"
      class="col-xs-12 col-sm-4"
    ></the-chat-contacts>
    <the-chat-messages
      v-if="
        mobileNavigationStore.mobileViewHandler(`chats`) && chatStore.chatSelect
      "
      class="col-xs-12 col-sm-8"
    ></the-chat-messages>
  </q-page>
</template>

<script setup>
import TheChatContacts from "src/components/TheChatContacts.vue";
import TheChatMessages from "src/components/TheChatMessages.vue";

import { useChatStore } from "src/stores/chat";
import { useMobileNavigationStore } from "src/stores/mobileNavigation";

const chatStore = useChatStore();
const mobileNavigationStore = useMobileNavigationStore();
</script>

<style></style>
