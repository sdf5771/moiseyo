import ChannelSection from "@/components/home/channel/ChannelSection";
import WorkspaceNavBar from "@/components/home/workspace/workspace-nav-bar/WorkspaceNavBar";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.workspace_nav_bar_section}>
        <WorkspaceNavBar />
      </section>
      <section className={styles.workspace_body_section}>
        <ChannelSection />
      </section>
    </main>
  );
}
