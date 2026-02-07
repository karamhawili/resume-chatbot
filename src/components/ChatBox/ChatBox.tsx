"use client";

import { useState } from "react";
import styles from "./ChatBox.module.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // TODO: API call will go here in Phase 3
    // For now, just a placeholder response
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: "Chat API will be connected in Phase 3!",
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h3>Ask me about Karam&apos;s resume</h3>
      </div>

      <div className={styles.messagesContainer}>
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            Ask me anything about the resume! For example: &quot;What frameworks
            does Karam know?&quot;
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                message.role === "user"
                  ? styles.userMessage
                  : styles.assistantMessage
              }`}
            >
              {message.content}
            </div>
          ))
        )}
        {isLoading && (
          <div className={`${styles.message} ${styles.assistantMessage}`}>
            Thinking...
          </div>
        )}
      </div>

      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask a question about the resume..."
          className={styles.input}
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className={styles.sendButton}
        >
          Send
        </button>
      </div>
    </div>
  );
}
