<template>
  <q-page class="row bg-dark text-white">
    <the-chat-messages class="col-xs-12"></the-chat-messages>
  </q-page>
</template>

<script setup>
import TheChatMessages from "src/components/TheChatMessages.vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { useChatStore } from "src/stores/chat";

const router = useRouter();

const chatStore = useChatStore();

onMounted(() => {
  if (!chatStore.chatSelect) router.push("/");
});
</script>
