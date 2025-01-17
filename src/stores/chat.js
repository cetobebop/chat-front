import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { socket } from "src/socket";
import { addReceiverPropertyToChat } from "src/composables/addReceiverProperty";
import { useUserStore } from "./user";

export const useChatStore = defineStore(
  "chatStore",
  () => {
    const myChats = ref([]);
    const chatSelect = ref(null);
    const userStore = useUserStore();
    const indexedChatwritingBands = ref({});
    const serverSendChatsToClientStatus = ref(null);
    let iAmWritingBand = false;
    let timeoutId;

    const getMyChatsLength = computed(() => myChats.value.length);

    function setServerSendChatsToClientStatus(boolean) {
      serverSendChatsToClientStatus.value = boolean;
    }

    const getServerSendChatsToClientStatus = computed(
      () => serverSendChatsToClientStatus.value
    );

    function obtainChatInformation(chat) {
      addReceiverPropertyToChat(chat);
      indexReceiversAndFindMe(chat);
      myChats.value = chat;
    }

    function indexReceiversAndFindMe(data) {
      const objt = {};

      data.map((chat) => {
        objt[chat.receiver._id] = chat.receiver;
      });

      if (objt[userStore.myUser._id])
        objt[userStore.myUser._id].username = "Yo";
    }

    function setNewChat(chat) {
      myChats.value.unshift(chat);
      socket.emit("client:join-new-chat", chat._id, (res) => {});
    }

    function setChatSelect(user, chat = undefined) {
      console.log("chat seleccionado: ", chat?._id);

      chatSelect.value = {
        user,
        chat,
      };
    }

    function iAmWriting(chatId) {
      clearTimeout(timeoutId);

      if (!iAmWritingBand) {
        socket.emit("client:user-is-writing", chatId);
        iAmWritingBand = true;
      }

      timeoutId = setTimeout(function () {
        socket.emit("client:user-stopped-writing", chatId);
        iAmWritingBand = false;
      }, 1000);
    }

    function setWritingBand(chatId) {
      if (indexedChatwritingBands.value[chatId]) {
        indexedChatwritingBands.value[chatId] = false;

        return;
      }

      indexedChatwritingBands.value[chatId] = true;
    }

    function getWritingBand(chatId) {
      return indexedChatwritingBands.value[chatId];
    }

    return {
      myChats,
      chatSelect,
      getServerSendChatsToClientStatus,
      getMyChatsLength,
      setServerSendChatsToClientStatus,
      obtainChatInformation,
      setChatSelect,
      setNewChat,
      iAmWriting,
      setWritingBand,
      getWritingBand,
    };
  },
  { persist: true }
);
