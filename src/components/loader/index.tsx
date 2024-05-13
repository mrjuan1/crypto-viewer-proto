import { ReactNode } from "react";

import styles from "./styles.module.css";

const Loader = () => (
  <div className={styles.container}>
    <div className={styles.loader}></div>
  </div>
);

export default Loader;
