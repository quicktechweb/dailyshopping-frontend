import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { X, Send } from "lucide-react";
import socket from "../../../socket";
import useAuth from "../../Hooks/useAuth";

export default function ChatWidget({ sellerId, sellerName, product, onClose }) {
  const { user } = useAuth();
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [sellerTyping, setSellerTyping] = useState(false);
  const bottomRef = useRef(null);

  const buyerId = user?._id;
  const buyerName = user?.displayName;

  // 1) conversation start/find + history load
  useEffect(() => {
    if (!buyerId || !sellerId) return;

    axios
      .post("https://dailyshopping-backend.onrender.com/api/chat/conversations/start", {
        buyerId,
        buyerName,
        sellerId,
        sellerName,
        productId: product?._id,
        productName: product?.name,
        productImage: product?.img || product?.images?.[0],
      })
      .then(async ({ data }) => {
        setConversation(data.conversation);
        const res = await axios.get(
          `https://dailyshopping-backend.onrender.com/api/chat/messages/${data.conversation._id}`
        );
        setMessages(res.data.messages);

        // socket connect + join + read mark
        if (!socket.connected) socket.connect();
        socket.emit("join", { role: "user", id: buyerId });
        socket.emit("mark_read", { conversationId: data.conversation._id, role: "user" });
      });
  }, [buyerId, sellerId]);

  // 2) realtime listeners
  useEffect(() => {
    const handleReceive = (msg) => {
      if (conversation && msg.conversationId === conversation._id) {
        setMessages((prev) => [...prev, msg]);
      }
    };
    const handleTyping = ({ conversationId }) => {
      if (conversation && conversationId === conversation._id) setSellerTyping(true);
    };
    const handleStopTyping = () => setSellerTyping(false);

    socket.on("receive_message", handleReceive);
    socket.on("typing", handleTyping);
    socket.on("stop_typing", handleStopTyping);

    return () => {
      socket.off("receive_message", handleReceive);
      socket.off("typing", handleTyping);
      socket.off("stop_typing", handleStopTyping);
    };
  }, [conversation]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim() || !conversation) return;

    socket.emit("send_message", {
      conversationId: conversation._id,
      buyerId,
      buyerName,
      sellerId,
      sellerName,
      senderRole: "user",
      text,
    });

    setText("");
    socket.emit("stop_typing", { conversationId: conversation._id, buyerId, sellerId, fromRole: "user" });
  };

  const handleTypingInput = (val) => {
    setText(val);
    if (!conversation) return;
    socket.emit("typing", { conversationId: conversation._id, buyerId, sellerId, fromRole: "user" });
  };

  return (
    <div className="fixed bottom-4 right-4 w-[340px] h-[460px] bg-white shadow-2xl rounded-xl flex flex-col z-[60] border">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b bg-emerald-600 text-white rounded-t-xl">
        <span className="font-semibold">{sellerName || "Seller"}</span>
        <button onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
        {messages.map((m) => (
          <div
            key={m._id}
            className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
              m.senderRole === "user"
                ? "bg-emerald-600 text-white ml-auto rounded-br-none"
                : "bg-white border rounded-bl-none"
            }`}
          >
            {m.text}
          </div>
        ))}
        {sellerTyping && <div className="text-xs text-gray-400">seller typing...</div>}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-2 border-t flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => handleTypingInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-3 py-2 text-sm outline-none"
        />
        <button
          onClick={sendMessage}
          className="w-9 h-9 flex items-center justify-center bg-emerald-600 text-white rounded-full"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}