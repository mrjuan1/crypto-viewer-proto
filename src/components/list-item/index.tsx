import { ReactNode, useEffect, useState } from "react";

import styles from "./styles.module.css";

export type ListItemSelectFunc = (coinId: string) => void;

interface ListItemPriceChanges {
  price24h: number;
  pricePercent24h: number;
  pricePercent7d: number;
}

interface ListItemProps {
  fadeInDelay?: string;
  coinId: string;
  logoURL: string;
  name: string;
  currency: string;
  price: number;
  changes: ListItemPriceChanges;
  marketCap: number;
  onSelect: ListItemSelectFunc;
}

const ListItem = (props: ListItemProps) => {
  const [currency, setCurrency] = useState<string>(
    props.currency.toUpperCase(),
  );

  useEffect(() => {
    setCurrency(props.currency.toUpperCase());
  }, [props.currency]);

  return (
    <div
      className={styles.container}
      style={{ animationDelay: props.fadeInDelay }}
      onClick={() => props.onSelect(props.coinId)}
    >
      <div
        className={styles.logo}
        style={{
          background: `url("${props.logoURL.replace("/large/", "/standard/")}") round`,
        }}
      ></div>

      <div className={styles["name-and-price"]}>
        <div className={styles.name}>{props.name}</div>

        <div className={styles.price}>
          {currency} {props.price.toLocaleString()}
        </div>
      </div>

      <div
        className={`${styles["price-24h"]} ${props.changes.price24h < 0 ? styles.decreased : styles.increased}`}
      >
        {currency} {props.changes.price24h.toLocaleString()}
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
        {currency} {props.marketCap.toLocaleString()}
      </div>
    </div>
  );
};

export default ListItem;
