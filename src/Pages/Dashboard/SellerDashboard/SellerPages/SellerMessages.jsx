import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Send } from "lucide-react";
import useSellerAuth from "../../../Hooks/useSellerAuth";
import socket from "../../../../socket";

export default function SellerMessages() {
  const { seller } = useSellerAuth();
  const sellerId = seller?.sellerId;

  const [conversations, setConversations] = useState([]);
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);
   const activeRef = useRef(null);

   useEffect(() => {
  activeRef.current = active;
}, [active]);

  // conversation list + socket join
  useEffect(() => {
    if (!sellerId) return;

    axios
      .get(`https://dailyshopping-backend.onrender.com/api/chat/conversations/seller/${sellerId}`)
      .then((res) => setConversations(res.data.conversations));

    if (!socket.connected) socket.connect();
    socket.emit("join", { role: "seller", id: sellerId });

   

// active state যখনই বদলাবে, ref ও sync থাকবে


   const handleReceive = (msg) => {
  setConversations((prev) => {
    const idx = prev.findIndex((c) => c._id === msg.conversationId);
    if (idx === -1) return prev;
    const updated = [...prev];
    updated[idx] = { ...updated[idx], lastMessage: msg.text, lastMessageAt: msg.createdAt };
    return updated;
  });

  // ref দিয়ে চেক করছি, আরেকটা setState এর ভেতরে না — তাই double-invoke হবে না
  if (activeRef.current && activeRef.current._id === msg.conversationId) {
    setMessages((prev) => [...prev, msg]);
  }
};
    socket.on("receive_message", handleReceive);
    return () => socket.off("receive_message", handleReceive);
  }, [sellerId]);

  const openConversation = async (conv) => {
    setActive(conv);
    const res = await axios.get(`https://dailyshopping-backend.onrender.com/api/chat/messages/${conv._id}`);
    setMessages(res.data.messages);
    socket.emit("mark_read", { conversationId: conv._id, role: "seller" });
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim() || !active) return;
    socket.emit("send_message", {
      conversationId: active._id,
      buyerId: active.buyerId,
      buyerName: active.buyerName,
      sellerId,
      sellerName: seller?.shopName,
      senderRole: "seller",
      text,
    });
    setText("");
  };

  return (
    <div className="flex h-[75vh] border rounded-xl overflow-hidden">
      {/* Conversation list */}
      <div className="w-72 border-r overflow-y-auto bg-gray-50">
        {conversations.map((c) => (
          <div
            key={c._id}
            onClick={() => openConversation(c)}
            className={`p-3 border-b cursor-pointer hover:bg-white ${
              active?._id === c._id ? "bg-white" : ""
            }`}
          >
            <div className="font-semibold text-sm">{c.buyerName || "Customer"}</div>
            <div className="text-xs text-gray-500 truncate">{c.lastMessage}</div>
            {c.unreadForSeller > 0 && (
              <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                {c.unreadForSeller} new
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Chat window */}
      <div className="flex-1 flex flex-col">
        {!active ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a conversation
          </div>
        ) : (
          <>
            <div className="p-3 border-b font-semibold">{active.buyerName || "Customer"}</div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
              {messages.map((m) => (
                <div
                  key={m._id}
                  className={`max-w-[60%] px-3 py-2 rounded-lg text-sm ${
                    m.senderRole === "seller"
                      ? "bg-emerald-600 text-white ml-auto rounded-br-none"
                      : "bg-white border rounded-bl-none"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <div className="p-2 border-t flex items-center gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Reply..."
                className="flex-1 border rounded-full px-3 py-2 text-sm outline-none"
              />
              <button
                onClick={sendMessage}
                className="w-9 h-9 flex items-center justify-center bg-emerald-600 text-white rounded-full"
              >
                <Send size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}