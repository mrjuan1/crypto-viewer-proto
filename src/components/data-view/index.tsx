import IconButton from "@components/icon-button";
import Titlebar from "@components/titlebar";
import { ReactNode, useEffect, useState } from "react";

import styles from "./styles.module.css";
import Stat from "./stat";

interface KeyPair<T = unknown> {
  [key: string]: T;
}

interface MarketData {
  current_price: KeyPair<number>;
  market_cap: KeyPair<number>;
  market_cap_rank: number;
  total_volume: KeyPair<number>;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_30d: number;
  price_change_percentage_1y: number;
  market_cap_change_percentage_24h: number;
  price_change_24h_in_currency: KeyPair<number>;
  price_change_percentage_1h_in_currency: KeyPair<number>;
  price_change_percentage_24h_in_currency: KeyPair<number>;
  price_change_percentage_7d_in_currency: KeyPair<number>;
  price_change_percentage_30d_in_currency: KeyPair<number>;
  price_change_percentage_1y_in_currency: KeyPair<number>;
  market_cap_change_24h_in_currency: KeyPair<number>;
  market_cap_change_percentage_24h_in_currency: KeyPair<number>;
}

interface DetailsData {
  symbol: string;
  name: string;
  links: {
    homepage: string[];
    whitepaper: string;
    repos_url: KeyPair<string[]>;
  };
  image: { large: string };
  genesis_date: string;
  market_data: MarketData;
}

interface DetailsDataViewProps {
  data: DetailsData;
  currency: string;
  onCloseRequest: () => void;
}

const DetailsDataView = (props: DetailsDataViewProps): ReactNode => {
  const [repoLinks, setRepoLinks] = useState<ReactNode[]>([]);
  const [currency, setCurrency] = useState<string>(
    props.currency.toUpperCase(),
  );

  useEffect(() => {
    const repoLinks: ReactNode[] = Object.keys(
      props.data.links.repos_url,
    ).map<ReactNode>((key: string): ReactNode => {
      const links: string[] = props.data.links.repos_url[key];

      return links[0] ? (
        <div>
          <a href={links[0]} target="_blank">
            {key}
          </a>
        </div>
      ) : null;
    });

    setRepoLinks(repoLinks);
  }, [props.data.links.repos_url]);

  useEffect(() => {
    setCurrency(props.currency.toUpperCase());
  }, [props.currency]);

  const keyUpHandler = (event: any) => {
    if (event.key === "Escape") {
      props.onCloseRequest();
    }
  };

  const closeButton: ReactNode = (
    <IconButton onClick={props.onCloseRequest}>
      <div className={styles["close-icon"]}></div>
    </IconButton>
  );

  const marketDataField = (fieldName: string): any => {
    const marketData: KeyPair<any> = props.data.market_data; // oof, there has to be a better way...
    return marketData[fieldName][props.currency];
  };

  const currencyField = (fieldName: string): string => {
    const value = marketDataField(fieldName);
    return `${currency} ${value.toLocaleString()}`;
  };

  const percentField = (fieldName: string): string => {
    const value = marketDataField(fieldName);
    return `${value > 0 ? "+" : ""}${value.toLocaleString()}%`;
  };

  return (
    <div className={styles.container} tabIndex={0} onKeyUp={keyUpHandler}>
      <Titlebar
        logoURL={props.data.image.large.replace("/large/", "/standard/")}
        title={`${props.data.name} (${props.data.symbol.toUpperCase()})`}
        actionsArea={closeButton}
      />

      <div className={styles.content}>
        <div className={styles.stats}>
          <Stat label="Price:">{currencyField("current_price")}</Stat>
          <Stat label="Market cap:">{currencyField("market_cap")}</Stat>

          <Stat label="Market cap rank:" inline>
            &nbsp;#{props.data.market_data.market_cap_rank}
          </Stat>

          <Stat label="Total volume:">{currencyField("total_volume")}</Stat>
        </div>

        <div className={styles.stats}>
          <div className={styles["stat-title"]}>Price changes</div>
        </div>

        <div className={styles.stats}>
          <Stat
            label="24 hours:"
            valueChange={marketDataField(
              "price_change_percentage_24h_in_currency",
            )}
          >
            {percentField("price_change_percentage_24h_in_currency")}
            &nbsp;({currencyField("price_change_24h_in_currency")})
          </Stat>

          <Stat
            label="7 days:"
            valueChange={marketDataField(
              "price_change_percentage_7d_in_currency",
            )}
          >
            {percentField("price_change_percentage_7d_in_currency")}
          </Stat>

          <Stat
            label="30 days:"
            valueChange={marketDataField(
              "price_change_percentage_30d_in_currency",
            )}
          >
            {percentField("price_change_percentage_30d_in_currency")}
          </Stat>

          <Stat
            label="1 year:"
            valueChange={marketDataField(
              "price_change_percentage_1y_in_currency",
            )}
          >
            {percentField("price_change_percentage_1y_in_currency")}
          </Stat>
        </div>

        <div className={styles.stats}>
          <div className={styles["stat-title"]}>Market cap changes</div>
        </div>

        <div className={styles.stats}>
          <Stat
            label="24 hours:"
            valueChange={marketDataField(
              "market_cap_change_percentage_24h_in_currency",
            )}
          >
            {percentField("market_cap_change_percentage_24h_in_currency")}
            &nbsp;({currencyField("market_cap_change_24h_in_currency")})
          </Stat>

          {/* price_change_percentage_1h_in_currency
          market_cap_change_24h_in_currency */}
        </div>

        <div className={styles["info-bar"]}>
          {props.data.genesis_date && (
            <div>Founded: {props.data.genesis_date}</div>
          )}

          <div className={styles.links}>
            {props.data.links.homepage[0] && (
              <div>
                <a href={props.data.links.homepage[0]} target="_blank">
                  Website
                </a>
              </div>
            )}

            {props.data.links.whitepaper && (
              <div>
                <a href={props.data.links.whitepaper} target="_blank">
                  Whitepaper
                </a>
              </div>
            )}

            {repoLinks}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsDataView;
