import { io } from "socket.io-client";
const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://www.steinlux.com";
const socket = io.connect(URL, {
  autoConnect: false,
});
export default socket;
