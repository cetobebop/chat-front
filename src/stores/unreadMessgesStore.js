import { defineStore } from "pinia";
import { ref } from "vue";

export const useUnreadMessagesStore = defineStore("unreadMessages", () => {
  const indexedUnreadMessages = ref({});

  function initIndexedUnreadMessages(data) {
    indexedUnreadMessages.value = data;
  }

  function setIndexedUnreadMessage(chatId) {
    if (!indexedUnreadMessages.value[chatId]) {
      indexedUnreadMessages.value[chatId] = 1;
      return;
    }
    indexedUnreadMessages.value[chatId] += 1;
  }

  function getChatUnreadMessages(chatId) {
    const unread = indexedUnreadMessages.value[chatId];
    return unread;
  }

  function removeUnreadChats(chatId) {
    delete indexedUnreadMessages.value[chatId];
  }

  function getChatsLength() {
    const chatLength = Object.keys(indexedUnreadMessages.value).length;

    return chatLength;
  }

  return {
    initIndexedUnreadMessages,
    setIndexedUnreadMessage,
    getChatUnreadMessages,
    getChatsLength,
    removeUnreadChats,
  };
});
