import Loader from "@components/loader";
import { useEffect, useState } from "react";
import useSWR from "swr";

import styles from "./styles.module.css";

interface CurrencySelectorProps {
  onCurrencyChange: (currency: string) => void;
}

const CurrencySelector = (props: CurrencySelectorProps) => {
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [fadeOutLoader, setFadeOutLoader] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showList, setShowList] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>("zar");

  const { isLoading, error, data } = useSWR("/simple/supported_vs_currencies");

  useEffect(() => {
    if (isLoading) {
      return;
    } else {
      setFadeOutLoader(true);

      setTimeout(() => {
        setShowLoader(false);
      }, 600);

      if (error || !data || data.error || data.length === 0) {
        if (error) {
          console.error(error);
        }

        if (data.error) {
          console.error(data.error);
        }

        setErrorMessage(
          "Failed to load list of currencies. Please refresh to try again.",
        );

        return;
      }
    }
  }, [isLoading, error, data]);

  const listItemClickHandler = (selectedCurrency: string) => {
    const selectedCurrencyLower = selectedCurrency.toLocaleLowerCase();

    if (selectedCurrencyLower !== currency) {
      setShowList(false);
      setCurrency(selectedCurrencyLower);
      props.onCurrencyChange(selectedCurrencyLower);
    }
  };

  return showLoader ? (
    <div
      className={`${styles["loader-container"]}${fadeOutLoader ? ` ${styles["fade-out"]}` : ""}`}
    >
      <Loader />
    </div>
  ) : (
    (errorMessage && <div className={styles.error}>{errorMessage}</div>) ||
      (data && (
        <>
          <div
            className={styles.selector}
            style={{ background: showList ? "var(--background)" : "initial" }}
            onClick={() => setShowList(!showList)}
          >
            {currency.toUpperCase()}
            <div
              className={styles["dropdown-icon"]}
              style={{ rotate: showList ? "-180deg" : "0deg" }}
            ></div>
          </div>

          <div
            className={styles.list}
            style={{
              zIndex: showList ? 1 : -1,
              opacity: showList ? 1 : 0,
            }}
          >
            {data.map((item: string, index: number) => (
              <div
                key={`currency-list-item-${index}-${item}`}
                className={styles["list-item"]}
                onClick={() => listItemClickHandler(item)}
              >
                {item.toUpperCase()}
              </div>
            ))}
          </div>
        </>
      ))
  );
};

export default CurrencySelector;
