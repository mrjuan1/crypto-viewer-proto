import { ReactNode } from "react";

import styles from "./dashboard.module.css";

const Dashboard = (): ReactNode => (
  <div className={styles.dashboard}>
    <div className={styles.content}>Dashboard content</div>
  </div>
);

export default Dashboard;
