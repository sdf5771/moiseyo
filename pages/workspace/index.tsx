import ChannelSection from "@/components/workspace/channel/ChannelSection";
import WorkspaceNavBar from "@/components/workspace/workspace-nav-bar/WorkspaceNavBar";
import styles from "./Workspace.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Workspace() {
  const router = useRouter();
  const [wid, setWid] = useState<string | null>(null);
  const [channelId, setChannelId] = useState<string | null>(null);
  
  useEffect(() => {
    if(router.query.wid && typeof(router.query.wid) === 'string'){
      setWid(router.query.wid);
    }

    if(router.query.channel && typeof(router.query.channel) === 'string'){
      setChannelId(router.query.channel);
    }
  }, [router]);
  return (
    <main className={styles.main}>
      <section className={styles.workspace_nav_bar_section}>
        {wid && channelId ? <WorkspaceNavBar workspaceId={wid} activeMenu={channelId}/> : null}
      </section>
      <section className={styles.workspace_body_section}>
        <ChannelSection />
      </section>
    </main>
  );
}
