import { ReactNode } from "react";

import styles from "./styles.module.css";

interface TitlebarProps {
  title?: string;
  logoURL?: string;
  actionsArea?: ReactNode;
}

const Titlebar = (props: TitlebarProps): ReactNode => (
  <div className={styles.titlebar}>
    {props.logoURL && (
      <div
        className={styles.logo}
        style={{ background: `url("${props.logoURL}") round` }}
      ></div>
    )}

    {props.title && <div className={styles.title}>{props.title}</div>}

    {props.actionsArea && (
      <div className={styles.actions}>{props.actionsArea}</div>
    )}
  </div>
);

export default Titlebar;
