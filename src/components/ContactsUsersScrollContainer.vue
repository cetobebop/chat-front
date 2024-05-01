<template>
  <q-scroll-area
    style="height: calc(100% - 60px - 60px); max-width: 100%"
    class="q-pl-sm"
  >
    <contacts-users-online-list
      v-if="tabStore.tab === `users`"
      :usersOnline="userStore.otherConnectedUsers"
    ></contacts-users-online-list>

    <contacts-users-contacts-list
      :maxWidth="maxWidth"
      v-if="tabStore.tab === `chats`"
    ></contacts-users-contacts-list>
  </q-scroll-area>
</template>

<script setup>
import ContactsUsersOnlineList from "./ContactsUsersOnlineList.vue";
import ContactsUsersContactsList from "./ContactsUsersContactsList.vue";

import { useUserStore } from "src/stores/user";
import { useTabStore } from "src/stores/tab";

defineProps({
  maxWidth: Number,
});

const tabStore = useTabStore();
const userStore = useUserStore();
</script>
