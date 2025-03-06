import { ref } from "vue";
import { io } from "socket.io-client";
import { userEvents } from "./events/user";
import { roomsEvents } from "./events/chat";
import { messagesEvents } from "./events/messages";
import { imageEvents } from "./events/image";

import { useServerConnectionStore } from "./stores/serverConnection";

const serverConnectionStore = useServerConnectionStore();

export const state = ref(null);

const URL = process.env.URL_SERVER;

export const socket = io(URL, {
  autoConnect: false,
  auth: {
    token: null || localStorage.getItem("user"),
  },
});

socket.on("connect", () => {
  serverConnectionStore.setConnectionStatus(true);
  state.value = true;
});

socket.on("disconnect", () => {
  state.value = false;
});

userEvents(socket);
roomsEvents(socket);
messagesEvents(socket);
imageEvents(socket);

socket.on("connect_error", (err) => {
  console.log("sin coneccion papi");
  serverConnectionStore.setConnectionStatus(false);
  // console.log(err.message); // prints the message associated with the error
});
