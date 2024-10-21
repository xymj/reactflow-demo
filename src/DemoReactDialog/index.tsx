import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useState } from "react";
import axios from "axios";

import "../DemoTailwind/styles.css";

export default function DemoReactDialog() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    // 添加用户消息到消息列表
    const userMessage = { sender: "user", content: inputMessage };
    setMessages([...messages, userMessage]);
    setInputMessage("");

    try {
      // 发送消息到后端
      const response = await axios.post("http://localhost:8080/api/chat", {
        message: inputMessage,
      });
      const botMessage = { sender: "bot", content: response.data.reply };

      // 添加机器人回复到消息列表
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Trigger asChild>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Open Chat
          </button>
        </DialogPrimitive.Trigger>

        <DialogPrimitive.Overlay className="fixed inset-0 bg-black opacity-50" />

        <DialogPrimitive.Content className="fixed top-1/2 left-1/2 w-80 max-w-md transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg">
          <DialogPrimitive.Title className="text-lg font-semibold">
            Chat
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="mt-2 text-sm text-gray-500">
            This is a chat dialog. You can send messages to the bot.
          </DialogPrimitive.Description>
          <div className="mt-4 flex flex-col space-y-2">
            <div className="flex flex-col space-y-2 h-64 overflow-y-auto bg-gray-100 p-2 rounded">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded ${
                    msg.sender === "user"
                      ? "bg-blue-200 self-end"
                      : "bg-gray-200 self-start"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="border p-2 rounded focus:outline-none focus:ring"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Send
            </button>
          </div>
          <div className="mt-4 flex justify-end">
            <DialogPrimitive.Close asChild>
              <button className="px-4 py-2 bg-red-500 text-white rounded">
                Close
              </button>
            </DialogPrimitive.Close>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Root>
    </div>
  );
}
