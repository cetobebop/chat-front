<template>
  <q-page class="row bg-dark text-white">
    <the-chat-contacts
      v-if="isUserView"
      class="col-xs-12 col-sm-4"
    ></the-chat-contacts>

    <messages-chat-unselected-chat
      class="col-xs-12 col-sm-8"
      v-if="
        !chatStore.chatSelect &&
        mobileNavigationStore.mobileViewHandler(`chats`)
      "
    ></messages-chat-unselected-chat>

    <the-chat-messages
      v-if="
        mobileNavigationStore.mobileViewHandler(`chats`) && chatStore.chatSelect
      "
      class="col-xs-12 col-sm-8"
    ></the-chat-messages>

    <the-loading-modal-container></the-loading-modal-container>

    <q-resize-observer @resize="onResize" />
  </q-page>
</template>

<script setup>
import { ref, watchEffect } from "vue";

import TheChatContacts from "src/components/TheChatContacts.vue";
import TheChatMessages from "src/components/TheChatMessages.vue";
import TheLoadingModalContainer from "src/components/TheLoadingModalContainer.vue";
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

window.addEventListener("popstate", function () {
  window.location.href = "/"; // Redirige a la página principal
});

watchEffect(() => {
  mobileNavigationStore.getSelectView();
  isUserView.value = mobileNavigationStore.mobileViewHandler(`users`);
});
</script>
