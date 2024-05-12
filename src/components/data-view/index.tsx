import Titlebar from "@components/titlebar";
import { ReactNode, useEffect } from "react";

import styles from "./styles.module.css";

interface DetailsData {
  image: { large: string };
  name: string;
  description: { en: string };
}

interface DetailsDataViewProps {
  data: DetailsData;
  onCloseRequest: () => void;
}

const DetailsDataView = (props: DetailsDataViewProps): ReactNode => {
  useEffect(() => {
    if (props.data) {
      console.log(props.data);
    }
  }, [props.data]);

  const keyUpHandler = (event: any) => {
    if (event.key === "Escape") {
      props.onCloseRequest();
    }
  };

  return (
    <div className={styles.container} tabIndex={0} onKeyUp={keyUpHandler}>
      <Titlebar
        logoURL={props.data.image.large.replace("/large/", "/standard/")}
        title={props.data.name}
      />

      <div className={styles.content}>{props.data.description.en}</div>
    </div>
  );
};

export default DetailsDataView;
