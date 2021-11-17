import React from "react";
import styles from './styles.module.scss';
import {VscGithubInverted} from "react-icons/vsc";
import {useAuth} from "../../hooks/useAuth";

export const LoginBox: React.FC = () => {
  const { signInUrl } = useAuth();
  
  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size={24} />
        Entrar com Github
      </a>
    </div>
  )
}