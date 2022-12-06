import qrcode from "qrcode-terminal";
import pkg from "whatsapp-web.js";
import dotenv from "dotenv";

dotenv.config();

const { Client, LocalAuth } = pkg;

import { ChatGPTAPI } from "./chat-api.js";

async function main(msg: string) {
  const api = new ChatGPTAPI({
    sessionToken: process.env.SESSION_TOKEN as string,
  });
  console.log("endure Auth");
  await api.ensureAuth();

  console.log("Send Msg");
  const response = await api.sendMessage(msg);

  return response;
}

// Use the saved values
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr: any) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
  client.on("message", (message: any) => {
    console.log(message.body);
    main(message.body)
      .then((res) => {
        console.log(res);
        client.sendMessage(message.from, res);
      })
      .catch((err) => console.log(err));
  });
});
// Save session values to the file upon successful auth
client.on("authenticated", (session: any) => {
  console.log("Auth success");
});

client.initialize();
