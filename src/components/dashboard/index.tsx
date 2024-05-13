import DetailsView from "@components/details";
import List from "@components/list";
import { ListItemSelectFunc } from "@components/list-item";
import { useState } from "react";

import styles from "./styles.module.css";

interface DashboardProps {
  currency: string;
}

const Dashboard = (props: DashboardProps) => {
  const [detailsOpacity, setDetailsOpacity] = useState<number>(0);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedCoinId, setSelectedCoinId] = useState<string>("");

  const listItemSelectHandler: ListItemSelectFunc = (coinId: string) => {
    setDetailsOpacity(1);
    setShowDetails(true);
    setSelectedCoinId(coinId);
  };

  const detailsCloseRequestHandler = () => {
    setDetailsOpacity(0);

    setTimeout(() => {
      setShowDetails(false);
    }, 500);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.content}>
        <List
          currency={props.currency}
          onListItemSelect={listItemSelectHandler}
        />

        <div
          className={styles["details-container"]}
          style={{ opacity: detailsOpacity }}
        >
          {showDetails && (
            <DetailsView
              coinId={selectedCoinId}
              currency={props.currency}
              onCloseRequest={detailsCloseRequestHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
