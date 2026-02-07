import Resume from "@/components/Resume/Resume";
import ChatBox from "@/components/ChatBox/ChatBox";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.resumePanel}>
        <Resume />
      </div>
      <div className={styles.chatPanel}>
        <ChatBox />
      </div>
    </div>
  );
}
