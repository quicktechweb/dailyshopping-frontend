import { io } from "socket.io-client";

const socket = io("https://dailyshopping-backend.onrender.com", {
  autoConnect: false, // login/chat open হওয়ার পর connect করবো
});

export default socket;