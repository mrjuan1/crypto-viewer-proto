import { ReactNode } from "react";

import styles from "./styles.module.css";

interface ListItemPriceChanges {
  price24h: number;
  pricePercent24h: number;
  pricePercent7d: number;
}

interface ListItemProps {
  fadeInDelay?: string;
  logoURL: string;
  name: string;
  price: number;
  changes: ListItemPriceChanges;
  marketCap: number;
}

const ListItem = (props: ListItemProps): ReactNode => (
  <div
    className={styles.container}
    style={{ animationDelay: props.fadeInDelay ?? "unset" }}
  >
    <div
      className={styles.logo}
      style={{
        background: `url("${props.logoURL.replace("/large/", "/standard/")}") round`,
      }}
    ></div>

    <div className={styles["name-and-price"]}>
      <div className={styles.name}>{props.name}</div>
      <div className={styles.price}>R {props.price.toLocaleString()}</div>
    </div>

    <div
      className={`${styles["price-24h"]} ${props.changes.price24h < 0 ? styles.decreased : styles.increased}`}
    >
      R {props.changes.price24h.toLocaleString()}
    </div>

    <div
      className={`${styles["percent-24h"]} ${props.changes.pricePercent24h < 0 ? styles.decreased : styles.increased}`}
    >
      {props.changes.pricePercent24h.toLocaleString()} %
    </div>

    <div
      className={`${styles["percent-7d"]} ${props.changes.pricePercent7d < 0 ? styles.decreased : styles.increased}`}
    >
      {props.changes.pricePercent7d.toLocaleString()} %
    </div>

    <div className={styles["market-cap"]}>
      R {props.marketCap.toLocaleString()}
    </div>
  </div>
);

export default ListItem;
