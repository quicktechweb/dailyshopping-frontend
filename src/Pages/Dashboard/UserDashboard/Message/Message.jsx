import { useState } from "react";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";
import ScrollToTop from "../../../HomePage/ScrollToTop/ScrollToTop";

export default function Message() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Alice", text: "Hi, I need help with my order.", time: "10:00 AM", incoming: true },
    { id: 2, sender: "Me", text: "Sure! How can I assist you?", time: "10:05 AM", incoming: false },
    { id: 3, sender: "Alice", text: "I received the wrong item.", time: "10:07 AM", incoming: true },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "Me", text: newMessage, time: "Now", incoming: false }]);
    setNewMessage("");
  };

  return (
    <div className=" bg-gray-50 p-4 md:p-8 -mt-10">
        <ScrollToTop/>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">

        {/* Conversation List */}
        <div className="md:w-1/3 bg-white shadow rounded-xl p-4 flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Conversations</h2>
          <div className="space-y-2">
            {["Alice", "Bob", "Charlie"].map((user) => (
              <div key={user} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                <FaUserCircle className="w-8 h-8 text-gray-400" />
                <div>
                  <p className="text-gray-900 font-medium">{user}</p>
                  <p className="text-gray-500 text-sm truncate">Last message preview...</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Window */}
        <div className="md:w-2/3 bg-white shadow rounded-xl flex flex-col">
          <div className="p-4 flex-1 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.incoming ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-xl text-sm ${
                    msg.incoming ? "bg-gray-100 text-gray-800 rounded-bl-none" : "bg-blue-600 text-white rounded-br-none"
                  }`}
                >
                  {msg.text}
                  <div className="text-xs text-gray-400 mt-1 text-right">{msg.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="border-t border-gray-200 p-4 flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition"
            >
              <FaPaperPlane />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
