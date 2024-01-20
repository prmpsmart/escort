const io = require("socket.io-client");
const fs = require("fs");

let host = "";
host = "https://lazer-escort.onrender.com";
host = "http://localhost:3000";

const token = fs.readFileSync("t.txt", "utf8");

const socket = io(host, {
  path: "/ws",
  auth: { token },
});

socket.onAny((event, ...args) => {
  console.log("Socket.IO event:", event, args);
});

socket.on("connect", () => {
  console.log(`Connected`);
  setTimeout(() => {},
  socket.emit("new_message", { sender_id: "asas", receiver_id: "paspos", messageType: "text", data: "I love you Kenny" }));
});

socket.on("userStatus", (data) => {
  console.log(`User ${data.userId} is ${data.status}`);
});

socket.on("acknowledgement", (data) => {
  console.log(data);
});

socket.on("invalid_session", (data) => {
  console.log("Invalid Session: ", data);
  process.exit(1);
});

socket.on("invalid_token", (data) => {
  console.log("Invalid Token: ", data);
  process.exit(1);
});

socket.on("disconnect", () => {
  console.log("Disconnected from the server");
  process.exit(1);
});

socket.on("connect_error", (err) => {
  console.error("Error connecting to the server:", err.message);
  process.exit(1);
});

setInterval(() => {
  const dummyMessage = `Dummy User: Message at ${new Date().toLocaleTimeString()}`;
  socket.emit("message", dummyMessage);
}, 500);

// curl "http://localhost:3000/ws/?EIO=4&transport=polling"
