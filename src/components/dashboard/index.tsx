import List from "@components/list";
import { ListItemSelectFunc } from "@components/list-item";
import { ReactNode } from "react";

import styles from "./styles.module.css";

interface DashboardProps {
  onListItemSelect: ListItemSelectFunc;
}

const Dashboard = (props: DashboardProps): ReactNode => (
  <div className={styles.dashboard}>
    <div className={styles.content}>
      <List onListItemSelect={props.onListItemSelect} />
    </div>
  </div>
);

export default Dashboard;
