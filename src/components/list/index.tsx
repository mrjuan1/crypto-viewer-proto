"use client";

import ListItem from "@components/list-item";
import Loader from "@components/loader";
import { ReactNode, useEffect, useState } from "react";
import useSWR from "swr";
import styles from "./styles.module.css";

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

const LIST_ITEM_FADE_MS_MULTIPLIER: number = 125;

const List = (): ReactNode => {
  const [listItems, setListItems] = useState<ReactNode[]>([]);

  const { isLoading, error, data } = useSWR<CoinMarketResponse[]>(
    "/coins/markets?vs_currency=zar&per_page=10&price_change_percentage=7d&precision=2",
  );

  useEffect((): void => {
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
      const listItemComponents: ReactNode[] = data.map<ReactNode>(
        (entry: CoinMarketResponse, index: number) => (
          <ListItem
            key={`list-item-${index}`}
            fadeInDelay={`${index * LIST_ITEM_FADE_MS_MULTIPLIER}ms`}
            logoURL={entry.image}
            name={entry.name}
            price={entry.current_price}
            changes={{
              price24h: entry.price_change_24h,
              pricePercent24h: entry.price_change_percentage_24h,
              pricePercent7d: entry.price_change_percentage_7d_in_currency,
            }}
            marketCap={entry.market_cap}
          />
        ),
      );

      setListItems(listItemComponents);
    }
  }, [isLoading, error, data]);

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
