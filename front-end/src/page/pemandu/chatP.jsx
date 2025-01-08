import React, { useState, useEffect } from "react";

const Chat = () => {
  const [contacts, setContacts] = useState([]); // State untuk daftar kontak
  const [selectedContact, setSelectedContact] = useState(null); // Kontak yang dipilih
  const [messages, setMessages] = useState([]); // State untuk pesan chat
  const [newMessage, setNewMessage] = useState(""); // Pesan baru yang diketik

  // Fetch data dari API saat komponen dimount
  useEffect(() => {
    fetchContacts();
  }, []);

  // Fungsi untuk mengambil kontak dari API
  const fetchContacts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/Chat/contacts");

      if (!response.ok) {
        console.error('HTTP Error: ${response.status}');
        throw new Error('HTTP Error: ${response.status}');
      }

      const data = await response.json();
      console.log("Data dari API (Contacts):", data);
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // Fungsi untuk mengambil pesan berdasarkan kontak yang dipilih
  const fetchMessages = async (contactId) => {
    try {
      const response = await fetch('http://localhost:5000/api/Chat/messages/${contactId}');

      if (!response.ok) {
        console.error('HTTP Error: ${response.status}');
        throw new Error('HTTP Error: ${response.status}');
      }

      const data = await response.json();
      console.log("Data dari API (Messages):", data);
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Fungsi untuk mengirim pesan baru
  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const response = await fetch("http://localhost:5000/api/Chat/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactId: selectedContact.id,
          message: newMessage,
        }),
      });

      if (!response.ok) {
        console.error('HTTP Error: ${response.status}');
        throw new Error('HTTP Error: ${response.status}');
      }

      const newMessageData = await response.json();
      console.log("Pesan baru dikirim:", newMessageData);
      setMessages([...messages, newMessageData]); // Tambahkan pesan baru ke daftar
      setNewMessage(""); // Reset input
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex h-full bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/3 max-w-xs bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <input
            type="text"
            placeholder="Cari Kontak"
            className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <ul>
          {contacts.map((contact, index) => (
            <li
              key={index}
              className={`flex items-center p-4 hover:bg-gray-100 cursor-pointer border-b ${
                selectedContact?.id === contact.id ? "bg-gray-200" : ""
              }`}
              onClick={() => {
                setSelectedContact(contact);
                fetchMessages(contact.id); // Ambil pesan berdasarkan kontak yang dipilih
              }}
            >
              <div className="h-10 w-10 bg-blue-200 rounded-full flex items-center justify-center mr-3">
                <span className="text-gray-700 font-semibold">{contact.name.charAt(0)}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                <p className="text-xs text-gray-500">{contact.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="flex flex-col flex-1">
        {selectedContact ? (
          <>
            <div className="flex items-center justify-between p-4 border-b bg-white">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-blue-200 rounded-full flex items-center justify-center mr-3">
                  <span className="text-gray-700 font-semibold">
                    {selectedContact.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{selectedContact.name}</p>
                  <p className="text-xs text-gray-500">{selectedContact.role}</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sentByMe ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`${
                      message.sentByMe
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    } px-4 py-2 rounded-lg text-sm`}
                  >
                    {message.text}
                  </div>
                  <span className="text-xs text-gray-500 mt-1 ml-2">
                    {message.timestamp}
                  </span>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t flex items-center space-x-4">
              <input
                type="text"
                placeholder="Tulis pesan..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Kirim
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Pilih kontak untuk memulai chat</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;