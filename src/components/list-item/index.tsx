import { ReactNode } from "react";

import styles from "./styles.module.css";

interface ListItemProps {
  fadeInDelay?: string;
  logoURL: string;
  name: string;
}

const ListItem = (props: ListItemProps): ReactNode => (
  <div
    className={styles.container}
    style={{ animationDelay: props.fadeInDelay ?? "unset" }}
  >
    <div
      className={styles.logo}
      style={{ background: `url("${props.logoURL}") round` }}
    ></div>

    <div className={styles.name}>{props.name}</div>
  </div>
);

export default ListItem;
