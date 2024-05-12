import { ReactNode } from "react";

import styles from "./styles.module.css";

const Loader = (): ReactNode => (
  <div className={styles.container}>
    <div className={styles.loader}></div>
  </div>
);

export default Loader;
