"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./ChatBox.module.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatBoxProps {
  onViewResume?: () => void;
}

export default function ChatBox({ onViewResume }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <div className={styles.headerLeft}>
          <svg
            className={styles.messageIcon}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <h3>Chat Assistant</h3>
        </div>
        {onViewResume && (
          <button className={styles.mobileViewResumeBtn} onClick={onViewResume}>
            View Resume
          </button>
        )}
      </div>

      <div className={styles.messagesContainer}>
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>
              Ask me anything about the resume!
            </p>
            <div className={styles.chipContainer}>
              <button
                className={styles.chip}
                onClick={() => {
                  setInput("What frameworks does Karam know?");
                  // Auto-send after a tiny delay so user sees it
                  setTimeout(() => {
                    const event = new KeyboardEvent("keypress", {
                      key: "Enter",
                    });
                    document
                      .querySelector(`.${styles.input}`)
                      ?.dispatchEvent(event);
                  }, 100);
                }}
              >
                What frameworks does Karam know?
              </button>
              <button
                className={styles.chip}
                onClick={() => setInput("What are his UI/UX skills?")}
              >
                What are his UI/UX skills?
              </button>
              <button
                className={styles.chip}
                onClick={() => setInput("What projects has he built?")}
              >
                What projects has he built?
              </button>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
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
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
        {isLoading && (
          <div className={`${styles.message} ${styles.assistantMessage}`}>
            <div className={styles.loadingDots}>
              <span></span>
              <span></span>
              <span></span>
            </div>
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
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
