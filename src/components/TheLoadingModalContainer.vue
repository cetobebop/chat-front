<template>
  <base-loading-modal
    :showing="!serverConnectionStore.getConnectionBooleanStatus"
    :src="tortugaImageUrl"
    msg="El servidor gratuito se esta despertando, tardara un par de minutos, gracias por su paciencia"
  ></base-loading-modal>

  <base-loading-modal
    :showing="
      !chatStore.getMyChatsLength &&
      !chatStore.getServerSendChatsToClientStatus &&
      serverConnectionStore.getConnectionBooleanStatus
    "
    :src="tortugaImageUrl"
    msg="Cargando chats"
  ></base-loading-modal>
</template>

<script setup>
import BaseLoadingModal from "src/components/BaseLoadingModal.vue";
import tortugaImageUrl from "../../public/gif/tortuga_bailando.gif";

import { useServerConnectionStore } from "src/stores/serverConnection";
import { useChatStore } from "src/stores/chat";

const serverConnectionStore = useServerConnectionStore();
const chatStore = useChatStore();
</script>
