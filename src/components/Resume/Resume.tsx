import { resumeData } from "@/lib/resume-data";
import styles from "./Resume.module.css";

export default function Resume() {
  return (
    <div className={styles.resume}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.name}>{resumeData.personal.name}</h1>
        <h2 className={styles.title}>{resumeData.personal.title}</h2>
        <div className={styles.contact}>
          <span>{resumeData.personal.location}</span>
          <span>{resumeData.personal.phone}</span>
          <span>{resumeData.personal.email}</span>
          <span>{resumeData.personal.linkedin}</span>
        </div>
      </header>

      {/* About */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>About</h3>
        <p>{resumeData.about}</p>
      </section>

      {/* Experience */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Professional Experience</h3>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className={styles.experienceItem}>
            <div className={styles.experienceHeader}>
              <h4 className={styles.role}>{exp.role}</h4>
              <span className={styles.duration}>{exp.duration}</span>
            </div>
            <p className={styles.company}>{exp.company}</p>
            <p className={styles.stack}>Stack: {exp.stack}</p>
            <ul className={styles.achievements}>
              {exp.achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Technical Proficiencies</h3>
        <div className={styles.skillsGrid}>
          <div className={styles.skillCategory}>
            <h4>Frontend Development</h4>
            <p>{resumeData.skills.frontend.join(", ")}</p>
          </div>
          <div className={styles.skillCategory}>
            <h4>UI/UX Design</h4>
            <p>{resumeData.skills.uiux.join(", ")}</p>
          </div>
          <div className={styles.skillCategory}>
            <h4>Backend Exposure</h4>
            <p>{resumeData.skills.backend.join(", ")}</p>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Education</h3>
        <div className={styles.educationItem}>
          <h4>{resumeData.education.degree}</h4>
          <p>{resumeData.education.institution}</p>
          <p>{resumeData.education.duration}</p>
          <p>{resumeData.education.gpa}</p>
        </div>
      </section>

      {/* Languages */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Languages</h3>
        <p>{resumeData.languages.join(" • ")}</p>
      </section>
    </div>
  );
}
