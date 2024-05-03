import AuthForm from "@/components/login/AuthForm";
import styles from "./Login.module.css";

export default function Login() {
  return (
    <main className={styles.main}>
      <AuthForm />
    </main>
  );
}
