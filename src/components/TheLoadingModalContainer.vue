<template>
  <base-loading-modal
    :showing="!serverConnectionStore.getConnectionBooleanStatus"
    src="/public/gif/tortuga bailando.gif"
    msg="El servidor gratuito se esta despertando, tardara de 3 a 4 minutos, gracias por su paciencia"
  ></base-loading-modal>

  <base-loading-modal
    :showing="
      !chatStore.getMyChatsLength &&
      !chatStore.getServerSendChatsToClientStatus &&
      serverConnectionStore.getConnectionBooleanStatus
    "
    src="/public/gif/tortuga bailando.gif"
    msg="Cargando chats"
  ></base-loading-modal>
</template>

<script setup>
import BaseLoadingModal from "src/components/BaseLoadingModal.vue";

import { useServerConnectionStore } from "src/stores/serverConnection";
import { useChatStore } from "src/stores/chat";

const serverConnectionStore = useServerConnectionStore();
const chatStore = useChatStore();
</script>
