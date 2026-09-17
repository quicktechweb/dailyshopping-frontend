import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  autoConnect: false, // login/chat open হওয়ার পর connect করবো
});

export default socket;