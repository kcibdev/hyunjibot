import qrcode from "qrcode-terminal";
import pkg from "whatsapp-web.js";
import dotenv from "dotenv";

dotenv.config();

const { Client, LocalAuth } = pkg;

import { ChatGPTAPI } from "./chat-api.js";
import { appendToJson } from "./util.js";

async function main(msg: string) {
  const api = new ChatGPTAPI({
    sessionToken: process.env.SESSION_TOKEN as string,
  });

  await api.ensureAuth();

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
  client.on("message", (message: any) => {
    main(message.body)
      .then((res) => {
        client.sendMessage(message.from, res);
        appendToJson({
          userId: message.id.id,
          mobile: message.from,
          question: message.body,
          answer: res,
          device: message.deviceType,
          date: Date.now(),
        });
      })
      .catch((err) => console.log(err));
  });
});
// Save session values to the file upon successful auth
client.on("authenticated", (session: any) => {
  console.log("Started Authorization");
});

client.initialize();
