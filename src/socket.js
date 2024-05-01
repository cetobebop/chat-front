import { ref, onMounted } from "vue";
import { io } from "socket.io-client";
import { userEvents } from "./events/user";
import { roomsEvents } from "./events/chat";
import { messagesEvents } from "./events/messages";

export const state = ref(null);

const URL = process.env.URL_SERVER;

export const socket = io(URL, {
  autoConnect: false,
  auth: {
    token: null || localStorage.getItem("user"),
  },
});

socket.on("connect", () => {
  state.value = true;
});

socket.on("disconnect", () => {
  state.value = false;
});

userEvents(socket);
roomsEvents(socket);
messagesEvents(socket);

socket.on("connect_error", (err) => {
  console.log(err.message); // prints the message associated with the error
});
