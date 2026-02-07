"use client";

import { useState } from "react";
import Resume from "@/components/Resume/Resume";
import ChatBox from "@/components/ChatBox/ChatBox";
import styles from "./page.module.css";

export default function Home() {
  const [showResume, setShowResume] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.resumePanel}>
          <Resume />
        </div>
        <div className={styles.chatPanel}>
          <ChatBox onViewResume={() => setShowResume(true)} />
        </div>
      </div>

      {/* Mobile overlay */}
      {showResume && (
        <div className={styles.mobileResumeOverlay}>
          <div className={styles.resumeContent}>
            <Resume />
          </div>
          <button
            className={styles.backButton}
            onClick={() => setShowResume(false)}
          >
            ← Back to Chat
          </button>
        </div>
      )}
    </>
  );
}
