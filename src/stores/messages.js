import { defineStore } from "pinia";
import { ref } from "vue";
import { socket } from "src/socket";
import { useUserStore } from "./user";
import { useChatStore } from "./chat";
import { reverseRoles } from "src/composables/reverseRoles";

export const useMessageStore = defineStore("messageStore", () => {
  const receiver = ref(null);
  const allIndexedChatMessages = ref({});
  const lastMessagesIndexed = ref({});

  const useStore = useUserStore();
  const chatStore = useChatStore();

  function setReceiver(id) {
    receiver.value = id;
  }

  function setAllIndexedChatMessages(idChat, messages) {
    if (allIndexedChatMessages.value[idChat]) {
      lastMessagesIndexed.value[idChat] = messages.content;
      allIndexedChatMessages.value[idChat].unshift(messages);
      return;
    }

    lastMessagesIndexed.value[idChat] = messages[0].content;
    allIndexedChatMessages.value[idChat] = messages;
  }

  function getLastMessage(idChat) {
    return lastMessagesIndexed.value[idChat];
  }

  function obtainMessages(idChat) {
    if (allIndexedChatMessages.value[idChat]) return;
    socket.emit("client:get-chat-messages", idChat);
  }

  function getMessages(idChat) {
    return allIndexedChatMessages.value[idChat];
  }

  function sentMessage(msg, chatId) {
    const data = {
      content: msg,
      sender: useStore.myUser._id,
      receiver: receiver.value,
      status: {
        idArr: allIndexedChatMessages.value.length,
        sent: false,
      },
    };

    if (chatId) setAllIndexedChatMessages(chatId, data);

    socket.emit(
      "client:sent-message",
      {
        receiver: receiver.value,
        sender: useStore.myUser.nanoId,
        msg,
      },
      (res) => {
        console.log(res);
        if (res.status && res.newChat) {
          const chat = reverseRoles(res.newChat);
          setAllIndexedChatMessages(chat._id, [data]);
          chatStore.setNewChat(chat);
          chatStore.setChatSelect(chat.receiver, res.newChat);
        }
      }
    );
  }

  return {
    receiver,
    allIndexedChatMessages,
    lastMessagesIndexed,
    setReceiver,
    sentMessage,
    obtainMessages,
    getMessages,
    setAllIndexedChatMessages,
    getLastMessage,
  };
});
