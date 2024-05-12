"use client";

import Loader from "@components/loader";
import { ReactNode, useEffect, useState } from "react";
import useSWR from "swr";

import styles from "./styles.module.css";
import ListItem from "@components/list-item";

interface CoinMarketResponse {
  id: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
}

const List = (): ReactNode => {
  const [listItems, setListItems] = useState<ReactNode[]>([]);

  const { isLoading, error, data } = useSWR<CoinMarketResponse[]>(
    "/coins/markets?vs_currency=zar&per_page=10&price_change_percentage=7d&precision=2",
  );

  useEffect(() => {
    // TODO: Implement visual error notification(s)
    if (error) {
      console.error(error);
      return;
    }

    if (!data || data.length === 0) {
      console.error("No data returned");
      return;
    }

    if (data) {
      const listItemComponents: ReactNode[] = data.map(
        (entry: CoinMarketResponse, index: number) => (
          <ListItem
            key={`list-item-${index}`}
            fadeInDelay={`${index * 125}ms`}
            logoURL={entry.image}
            name={entry.name}
          />
        ),
      );

      setListItems(listItemComponents);
    }
  }, [isLoading, error, data]);

  // cache list of coins of it doesn't exist
  // fetch top 10 coins based off filter data
  // make component for displaying coin row and display one coin's row for now
  // update this component based off the display settings

  return (
    <div className={styles.container}>
      <div
        className={`${styles.loader}${isLoading ? "" : ` ${styles["loader-fade-out"]}`}`}
      >
        <Loader />
      </div>

      <div className={styles.list}>{listItems}</div>
    </div>
  );
};

export default List;
