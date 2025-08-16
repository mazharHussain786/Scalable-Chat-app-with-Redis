import { useEffect, useRef, useState } from "react";
import { useSocket } from "./Context/Socket";

export const Chat = () => {
  const [messages, setMessages] = useState<{ id: string; message: string }[]>([]);
  const messageRef = useRef<HTMLInputElement>(null);
  const { socket, sendMessage } = useSocket();

  useEffect(() => {
    const handleIncoming = (data: { id: string; message: string }) => {
      setMessages((prev) => [...prev, data]);
    };

    socket?.on("message", handleIncoming);

    return () => {
      socket?.off("message", handleIncoming);
    };
  }, [socket]);

  const handleSubmit = () => {
    if (messageRef.current?.value) {
      sendMessage(messageRef.current.value);
      messageRef.current.value = ""; // clear input
    }
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "40px auto",
        border: "1px solid #ddd",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f9f9f9",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "15px",
          backgroundColor: "#4A90E2",
          color: "white",
          fontSize: "20px",
          textAlign: "center",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        Chat Room ({messages.length})
      </div>

      {/* Messages Section */}
      <div
        style={{
          flex: 1,
          padding: "10px",
          overflowY: "auto",
          maxHeight: "300px",
        }}
      >
        {messages.length === 0 && (
          <p style={{ textAlign: "center", color: "#aaa" }}>No messages yet</p>
        )}
        {messages.map((data) => (
          <div
            key={data.id}
            style={{
              backgroundColor: "#fff",
              padding: "8px 12px",
              borderRadius: "6px",
              marginBottom: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <strong style={{ color: "#4A90E2" }}>ID:</strong> {data.id}
            <br />
            <span>{data.message}</span>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div
        style={{
          display: "flex",
          padding: "10px",
          borderTop: "1px solid #ddd",
          backgroundColor: "#fff",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        <input
          type="text"
          ref={messageRef}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "14px",
            outline: "none",
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            marginLeft: "10px",
            padding: "10px 15px",
            backgroundColor: "#4A90E2",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};
