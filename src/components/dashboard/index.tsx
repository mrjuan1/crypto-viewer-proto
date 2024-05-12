import List from "@components/list";
import { ReactNode } from "react";

import styles from "./styles.module.css";

const Dashboard = (): ReactNode => (
  <div className={styles.dashboard}>
    <div className={styles.content}>
      <List />
    </div>
  </div>
);

export default Dashboard;
