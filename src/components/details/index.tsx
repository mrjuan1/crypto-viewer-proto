import DetailsDataView from "@components/data-view";
import Loader from "@components/loader";
import { ReactNode, useEffect, useState } from "react";
import useSWR from "swr";

import styles from "./styles.module.css";

interface DetailsViewProps {
  coinId: string;
  currency: string;
  onCloseRequest: () => void;
}

const DetailsView = (props: DetailsViewProps): ReactNode => {
  const [haveLoader, setHaveLoader] = useState<boolean>(true);

  const { isLoading, data } = useSWR(
    `/coins/${props.coinId}?localization=false&tickers=false&community_data=false&developer_data=false`,
  );

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setHaveLoader(false);
      }, 500);
    }
  }, [isLoading]);

  useEffect(() => {
    if (data && data.error) {
      setTimeout(props.onCloseRequest, 5000);
    }
  }, [data, props.onCloseRequest]);

  return (
    <div className={styles.container}>
      {haveLoader ? (
        <div
          className={styles["loader-container"]}
          style={{ opacity: isLoading ? 1 : 0 }}
        >
          <Loader />
        </div>
      ) : (
        <div>
          {data && data.error ? (
            <div className={styles.error}>
              {data.error}
              <br />
              Returning in 5 seconds...
            </div>
          ) : (
            <DetailsDataView
              data={data}
              currency={props.currency}
              onCloseRequest={props.onCloseRequest}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DetailsView;
