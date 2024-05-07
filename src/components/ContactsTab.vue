<template>
  <div class="fixed" ref="divContainer" style="bottom: 0; width: 100%">
    <q-tabs
      v-model="tabStore.tab"
      no-caps
      switch-indicator
      class="text-white shadow-2"
      style="
        background: var(--panel-header-background);
        max-height: 60px;
        height: 60px;
        width: 100%;
      "
    >
      <q-tab name="users" label="Usuarios conectados" />
      <q-tab name="chats" :label="`Chats`">
        <q-badge
          v-if="unreadChats"
          color="teal-9"
          text-color="white"
          floating
          >{{ unreadChats }}</q-badge
        >
      </q-tab>
    </q-tabs>
  </div>
</template>

<script setup>
import { useTabStore } from "src/stores/tab";
import { useUnreadMessagesStore } from "src/stores/unreadMessgesStore";
import { computed, onMounted, watchEffect, ref } from "vue";

const props = defineProps({
  maxWidth: Number,
});

const tabStore = useTabStore();
const unreadMessgesStore = useUnreadMessagesStore();

const divContainer = ref(null);

onMounted(() => {
  watchEffect(() => {
    divContainer.value.style.maxWidth = `calc(${props.maxWidth}px - 1px)`;
  });
});

const unreadChats = computed(() => {
  return unreadMessgesStore.getChatsLength();
});
</script>

<style scoped>
.q-tab .q-badge {
  top: 8px !important;
}
</style>
