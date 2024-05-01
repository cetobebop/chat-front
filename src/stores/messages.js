import { defineStore } from "pinia";
import { ref } from "vue";
import { socket } from "src/socket";
import { useUserStore } from "./user";
import { useChatStore } from "./chat";
import { reverseRoles } from "src/composables/reverseRoles";
import moment from "moment";

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
      lastMessagesIndexed.value[idChat] = messages;
      allIndexedChatMessages.value[idChat].unshift(messages);
    } else {
      allIndexedChatMessages.value[idChat] = messages;
      lastMessagesIndexed.value[idChat] = messages[0];
    }
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

  function receivedMessages(chats) {
    let chatsId;

    if (Array.isArray(chats)) {
      chatsId = chats.map((c) => c._id);
    } else {
      chatsId = [chats];
    }

    socket.emit("client:messages-received", chatsId);
  }

  function readMessages(chatId) {
    socket.emit("client:messages-read", [chatId]);
  }

  function changeMessageStatus(idChat) {
    if (allIndexedChatMessages.value[idChat]) {
      allIndexedChatMessages.value[idChat][0].status = "sent";
    }
  }

  function modifyStatus(chatId, newStatus) {
    const arr = newStatus === "read" ? ["sent", "received"] : ["sent"];

    if (allIndexedChatMessages.value[chatId]) {
      allIndexedChatMessages.value[chatId].map((msg) => {
        if (arr.includes(msg.status)) msg.status = newStatus;
      });
    }
  }

  function sentMessage(msg, chatId) {
    const data = {
      content: msg,
      sender: useStore.myUser._id,
      receiver: receiver.value,
      status: undefined,
      createdAt: moment().format(),
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
        if (res.status && res.newChat) {
          const chat = reverseRoles(res.newChat);
          setAllIndexedChatMessages(chat._id, [data]);
          chatStore.setNewChat(chat);
          chatStore.setChatSelect(chat.receiver, res.newChat);
          changeMessageStatus(chat._id);
        } else if (res.status) {
          changeMessageStatus(chatId);
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
    receivedMessages,
    readMessages,
    modifyStatus,
  };
});
