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
    <q-tab name="chats" label="Chats" />
  </q-tabs>
</template>

<script setup>
import { useTabStore } from "src/stores/tab";

const tabStore = useTabStore();
</script>
