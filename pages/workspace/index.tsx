import ChannelSection from "@/components/workspace/channel/ChannelSection";
import WorkspaceNavBar from "@/components/workspace/workspace-nav-bar/WorkspaceNavBar";
import styles from "./Workspace.module.css";

export default function Workspace() {
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
