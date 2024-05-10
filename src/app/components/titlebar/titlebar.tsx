import { ReactNode } from "react";

import styles from "./titlebar.module.css";

interface TitlebarProps {
  title: string;
}

const Titlebar = (props: TitlebarProps): ReactNode => (
  <div className={styles.titlebar}>
    <div className={styles.logo}></div>
    {props.title}
  </div>
);

export default Titlebar;
