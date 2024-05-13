"use client";

import ListItem, { ListItemSelectFunc } from "@components/list-item";
import Loader from "@components/loader";
import {
  ReactElement,
  ReactNode,
  UIEvent,
  UIEventHandler,
  useEffect,
  useState,
} from "react";
import useSWR from "swr";
import styles from "./styles.module.css";

interface ListProps {
  currency: string;
  onListItemSelect: ListItemSelectFunc;
}

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

const List = (props: ListProps): ReactNode => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [haveLoader, setHaveLoader] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [listItems, setListItems] = useState<ReactElement[]>([]);
  const [bottomReached, setBottomReached] = useState<boolean>(false);

  const { isLoading, error, data } = useSWR<CoinMarketResponse[]>(
    `/coins/markets?vs_currency=${props.currency}&per_page=${itemsPerPage}&page=${page}&price_change_percentage=7d&precision=2`,
  );

  useEffect(() => {
    setBottomReached(true);
    setListItems([]);
    setHaveLoader(true);
    setPage(1);
    setItemsPerPage(10);
  }, [props.currency]);

  useEffect((): void => {
    if (isLoading) {
      return;
    } else {
      // Fade out animation for loader is 500ms.
      // Giving it double that before nuking it altogether
      setTimeout(() => setHaveLoader(false), 1000);
    }

    if (error || !data || data.length === 0) {
      if (error) {
        console.error(error);
      }

      setErrorMessage(
        "Failed to get the list of cryptocurrencies. Please refresh and try again.",
      );

      return;
    }

    const listItemComponents: ReactElement[] = data.map<ReactElement>(
      (entry: CoinMarketResponse, index: number) => (
        <ListItem
          key={`list-item-${index}-${entry.id}`}
          fadeInDelay={`${index * LIST_ITEM_FADE_MS_MULTIPLIER}ms`}
          coinId={entry.id}
          logoURL={entry.image}
          name={entry.name}
          currency={props.currency}
          price={entry.current_price}
          changes={{
            price24h: entry.price_change_24h,
            pricePercent24h: entry.price_change_percentage_24h,
            pricePercent7d: entry.price_change_percentage_7d_in_currency,
          }}
          marketCap={entry.market_cap}
          onSelect={props.onListItemSelect}
        />
      ),
    );

    setListItems((current: ReactElement[]): ReactElement[] => {
      if (current.length === 10 && listItemComponents.length === 100) {
        const result: ReactElement[] = listItemComponents.filter(
          (item: ReactElement, index: number): boolean => {
            if (index < current.length) {
              return item.key !== current[index].key;
            }

            return true;
          },
        );

        return [...current, ...result];
      }

      return [...current, ...listItemComponents];
    });

    setBottomReached(false);
    // Doing this because list is being extended with the last loaded values each time a list item is selected or the currency is changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, error, data]);

  const scrollHandler: UIEventHandler<HTMLDivElement> = (
    event: UIEvent<HTMLDivElement>,
  ): void => {
    if (
      event.currentTarget.clientHeight + event.currentTarget.scrollTop ===
      event.currentTarget.scrollHeight
    ) {
      if (!bottomReached) {
        setBottomReached(true);

        if (itemsPerPage === 10) {
          setItemsPerPage(100);
        } else {
          setPage(page + 1);
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      {haveLoader ? (
        <div
          className={`${styles.loader}${isLoading ? ` ${styles["loader-fade-in"]}` : ` ${styles["loader-fade-out"]}`}`}
        >
          <Loader />
        </div>
      ) : (
        (errorMessage && <div className={styles.error}>{errorMessage}</div>) ||
        (listItems && (
          <div className={styles.list} onScroll={scrollHandler}>
            {listItems}
          </div>
        ))
      )}
    </div>
  );
};

export default List;
