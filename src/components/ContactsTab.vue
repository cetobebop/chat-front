<template>
  <q-tabs
    v-model="tabStore.tab"
    no-caps
    switch-indicator
    class="text-white shadow-2"
    style="
      background: var(--panel-header-background);
      max-height: 60px;
      height: 60px;
    "
  >
    <q-tab name="users" label="Usuarios conectados" />
    <q-tab name="chats" :label="`Chats`">
      <q-badge v-if="unreadChats" color="teal-9" text-color="white" floating>{{
        unreadChats
      }}</q-badge>
    </q-tab>
  </q-tabs>
</template>

<script setup>
import { useTabStore } from "src/stores/tab";
import { useUnreadMessagesStore } from "src/stores/unreadMessgesStore";
import { computed } from "vue";

const tabStore = useTabStore();
const unreadMessgesStore = useUnreadMessagesStore();

const unreadChats = computed(() => {
  return unreadMessgesStore.getChatsLength();
});
</script>

<style scoped>
.q-tab .q-badge {
  top: 8px !important;
}
</style>
