import { ReactNode } from "react";

import styles from "./styles.module.css";

interface TitlebarProps {
  title: string;
  logoURL: string;
}

const Titlebar = (props: TitlebarProps): ReactNode => (
  <div className={styles.titlebar}>
    <div
      className={styles.logo}
      style={{ background: `url("${props.logoURL}") round` }}
    ></div>
    <div className={styles.title}>{props.title}</div>
  </div>
);

export default Titlebar;
