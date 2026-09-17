import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaPaperPlane, FaUserCircle, FaArrowLeft } from "react-icons/fa";
import ScrollToTop from "../../../HomePage/ScrollToTop/ScrollToTop";
import socket from "../../../../socket"; // ⚠️ path ঠিক করে নাও
import useSellerAuth from "../../../Hooks/useSellerAuth"; // ⚠️ path ঠিক করে নাও

export default function Message() {
  const { seller } = useSellerAuth();
  const sellerId = seller?.sellerId;
  const sellerName = seller?.shopName;

  const [conversations, setConversations] = useState([]);
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const activeRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    if (!sellerId) return;

    axios
      .get(`https://dailyshopping-backend.onrender.com/api/chat/conversations/seller/${sellerId}`)
      .then((res) => setConversations(res.data.conversations));

    if (!socket.connected) socket.connect();
    socket.emit("join", { role: "seller", id: sellerId });

    const handleReceive = (msg) => {
      setConversations((prev) => {
        const idx = prev.findIndex((c) => c._id === msg.conversationId);
        if (idx === -1) return prev;
        const updated = [...prev];
        updated[idx] = { ...updated[idx], lastMessage: msg.text, lastMessageAt: msg.createdAt };
        return updated;
      });

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
    setConversations((prev) =>
      prev.map((c) => (c._id === conv._id ? { ...c, unreadForSeller: 0 } : c))
    );
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim() || !active) return;
    socket.emit("send_message", {
      conversationId: active._id,
      buyerId: active.buyerId,
      buyerName: active.buyerName,
      sellerId,
      sellerName,
      senderRole: "seller",
      text: newMessage,
    });
    setNewMessage("");
  };

  const formatTime = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "";

  return (
    <div className="bg-gray-50 p-2 sm:p-4 md:p-8 -mt-10">
      <ScrollToTop />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 md:gap-6 h-[calc(100vh-140px)] md:h-[75vh]">

        {/* Conversation List — mobile এ active খোলা থাকলে hide হয়ে যাবে */}
        <div
          className={`md:w-1/3 w-full bg-white shadow rounded-xl p-3 sm:p-4 flex-col gap-2 overflow-y-auto ${
            active ? "hidden md:flex" : "flex"
          }`}
        >
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 px-1">
            Conversations
          </h2>
          <div className="space-y-1">
            {conversations.length === 0 && (
              <p className="text-gray-400 text-sm px-1">কোনো conversation নেই এখনো</p>
            )}
            {conversations.map((conv) => (
              <div
                key={conv._id}
                onClick={() => openConversation(conv)}
                className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition ${
                  active?._id === conv._id ? "bg-gray-100" : ""
                }`}
              >
                <FaUserCircle className="w-9 h-9 sm:w-8 sm:h-8 text-gray-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 font-medium text-sm sm:text-base truncate">
                    {conv.buyerName || "Customer"}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm truncate">
                    {conv.lastMessage || "..."}
                  </p>
                </div>
                {conv.unreadForSeller > 0 && (
                  <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full shrink-0">
                    {conv.unreadForSeller}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Message Window — mobile এ active না থাকলে hide হয়ে যাবে */}
        <div
          className={`md:w-2/3 w-full bg-white shadow rounded-xl flex-col min-h-0 ${
            active ? "flex" : "hidden md:flex"
          }`}
        >
          {!active ? (
            <div className="flex-1 items-center justify-center text-gray-400 hidden md:flex">
              একটা conversation বেছে নাও
            </div>
          ) : (
            <>
              {/* Header — mobile এ back button সহ */}
              <div className="p-3 sm:p-4 border-b flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setActive(null)}
                  className="md:hidden text-gray-500 hover:text-gray-700 p-1 -ml-1"
                  aria-label="Back to conversations"
                >
                  <FaArrowLeft size={18} />
                </button>
                <FaUserCircle className="w-8 h-8 text-gray-400 shrink-0" />
                <span className="font-semibold text-gray-800 truncate">
                  {active.buyerName || "Customer"}
                </span>
              </div>

              {/* Messages — নিজের height নিয়ে independently scroll করবে */}
              <div className="p-3 sm:p-4 flex-1 overflow-y-auto space-y-3 sm:space-y-4 min-h-0">
                {messages.map((msg) => {
                  const incoming = msg.senderRole !== "seller";
                  return (
                    <div key={msg._id} className={`flex ${incoming ? "justify-start" : "justify-end"}`}>
                      <div
                        className={`max-w-[80%] sm:max-w-xs px-3 sm:px-4 py-2 rounded-xl text-sm break-words ${
                          incoming
                            ? "bg-gray-100 text-gray-800 rounded-bl-none"
                            : "bg-blue-600 text-white rounded-br-none"
                        }`}
                      >
                        {msg.text}
                        <div
                          className={`text-[10px] mt-1 text-right ${
                            incoming ? "text-gray-400" : "text-blue-100"
                          }`}
                        >
                          {formatTime(msg.createdAt)}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={bottomRef} />
              </div>

              {/* Input Box */}
              <div className="border-t border-gray-200 p-2.5 sm:p-4 flex gap-2 shrink-0">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 min-w-0 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-full flex items-center gap-2 transition shrink-0"
                >
                  <FaPaperPlane size={14} />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}